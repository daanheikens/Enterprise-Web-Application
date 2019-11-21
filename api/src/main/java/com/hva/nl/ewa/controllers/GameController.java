package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.DTO.*;
import com.hva.nl.ewa.exceptions.PawnPlacerException;
import com.hva.nl.ewa.helpers.CollectionHelper;
import com.hva.nl.ewa.helpers.PawnPlacer;
import com.hva.nl.ewa.helpers.modelmappers.DefaultModelMapper;
import com.hva.nl.ewa.helpers.TimeHelper;
import com.hva.nl.ewa.models.*;
import com.hva.nl.ewa.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@Transactional
@RequestMapping(value = "/api/games", produces = MediaType.APPLICATION_JSON_VALUE)
public class GameController {
    private final GameService gameService;
    private final UserService userService;
    private final DefaultModelMapper modelMapper;
    private final BoardService boardService;
    private final PawnService pawnService;
    private final TileService tileService;

    @Autowired
    public GameController(
            GameService gameService,
            UserService userService,
            DefaultModelMapper modelMapper,
            BoardService boardService,
            PawnService pawnService,
            TileService tileService
    ) {
        this.gameService = gameService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.boardService = boardService;
        this.pawnService = pawnService;
        this.tileService = tileService;
    }

    @PostMapping
    public ResponseEntity<GameDTO> create(
            OAuth2Authentication auth,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "maxPlayers") Integer maxPlayers,
            @RequestParam(name = "maxTurnTime") Integer maxTurnTime,
            @RequestParam(name = "maxPendingTime") Integer maxPendingTime
    ) {
        User user = this.userService.loadUserByUsername(auth.getName());
        // If no user is found or user already in game, return 412 since we cannot create a new game
        if (user == null || user.getGames().size() > 0) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        Game game = new Game();
        game.setName(name);
        game.setMaxPlayers(maxPlayers);
        game.setMaxTurnTime(maxTurnTime);
        game.setMaxPendingTime(maxPendingTime);
        game.setCreationDate(new Date());
        game.addUser(user);
        BoardResult board = boardService.CreateBoard();

        Tile[][] tiles = board.getTiles();

        Pawn pawn = this.pawnService.create(user, game, tiles[0][0], PawnType.BLUE);

        tiles[0][0].setPawn(pawn);
        game.setTiles(tiles);
        game.setInitiator(user);
        game.setPlaceableTile(board.getPlaceableTile());
        game.setUserTurn(user);

        return new ResponseEntity<>(
                this.modelMapper.ModelToDTO(this.gameService.save(game), GameDTO.class),
                new HttpHeaders(),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<GameDTO>> find() {
        List<Game> games = this.gameService.find();
        List<GameDTO> gameDTOs = new ArrayList<>();

        for (Game game : games) {
            if (game.getUsers().size() >= game.getMaxPlayers()) {
                continue;
            }

            if (TimeHelper.timeElapsed(game.getCreationDate(), game.getMaxPendingTime())) {
                this.gameService.delete(game);
                continue;
            }

            GameDTO dto = this.modelMapper.ModelToDTO(game, GameDTO.class);
            dto.setCurrentPlayers(game.getUsers());
            gameDTOs.add(dto);
        }

        return new ResponseEntity<>(gameDTOs, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(value = "/current")
    public ResponseEntity<GameDTO> getCurrentGame(OAuth2Authentication auth) {
        User user = this.userService.loadUserByUsername(auth.getName());

        if (user == null) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
        }

        Game currentGame = this.gameService.getCurrentGame(user);

        if (currentGame == null) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
        }

        GameDTO dto = this.modelMapper.ModelToDTO(currentGame, GameDTO.class);
        dto.setCurrentPlayers(currentGame.getUsers());

        TileDTO[][] tilesArray = new TileDTO[7][7];

        /**
         * This is a temporary fix since it is pain in the ass to serialize relations. (Probably DTO can be replaced and
         * use of jackson serializer will help to remove all this overhead)
         */
        for (Tile t : currentGame.getTiles()) {
            TileDTO tileDTO = this.modelMapper.ModelToDTO(t, TileDTO.class);
            Pawn pawn = t.getPawn();
            if (pawn != null) {
                PawnDTO pawnDTO = this.modelMapper.ModelToDTO(pawn, PawnDTO.class);
                pawnDTO.setUser(pawn.getUser());
                tileDTO.setPawnDTO(pawnDTO);
            }
            tileDTO.setImgSrc(t.getTileDefinitionObject().getImgSrc());
            tilesArray[t.getxCoordinate()][t.getyCoordinate()] = tileDTO;
        }

        dto.setUser(user);
        dto.setUserTurn(currentGame.getUserTurn());

        Tile tile = currentGame.getPlaceableTile();
        TileDTO tileDTO = this.modelMapper.ModelToDTO(tile, TileDTO.class);
        tileDTO.setImgSrc(tile.getTileDefinitionObject().getImgSrc());

        dto.setPlaceAbleTile(tileDTO);
        dto.setMatrix(tilesArray);

        return new ResponseEntity<>(dto, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/join")
    public ResponseEntity joinGame(OAuth2Authentication auth, @RequestParam("gameId") Long gameId) throws PawnPlacerException {
        User user = this.userService.loadUserByUsername(auth.getName());

        if (user == null) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
        }

        Game game = this.gameService.findOne(gameId);

        if (game == null) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        Set<User> users = game.getUsers();

        if (users.size() >= game.getMaxPlayers()) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        game.addUser(user);
        Set<Tile> tiles = game.getTiles();

        Pawn pawn = new Pawn();
        pawn.setGame(game);
        pawn.setUser(user);
        // If 2 users, then index 1 will be returned which is the second
        pawn.setPawnType(PawnType.values()[users.size() - 1]);
        PawnPlacer.placePawnOnInitialTile(pawn, tiles, users.size());

        this.pawnService.save(pawn);
        this.gameService.save(game);

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }

    @PatchMapping(value = "/{gameId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity update(
            OAuth2Authentication auth,
            @PathVariable(value = "gameId") Long gameId,
            @RequestBody BoardDTO board
    ) {
        User user = this.userService.loadUserByUsername(auth.getName());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Game currentGame = this.gameService.findOne(gameId);

        if (currentGame == null) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        Set<Tile> tiles = CollectionHelper.toSet(board.getTiles());
        Map<Long, Tile> tilesMap = currentGame.getTilesAsMap();

        /**
         * Not optimal but works
         */
        for (Tile t : tiles) {
            Tile t2 = tilesMap.get(t.getTileId());
            t2.setyCoordinate(t.getyCoordinate());
            t2.setxCoordinate(t.getxCoordinate());
            t2.setRotation(t.getRotation());
        }

        Tile placeableTile = this.tileService.findOne(board.getPlaceableTile().getTileId());

        if (placeableTile == null) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        currentGame.setPlaceableTile(placeableTile);

        this.gameService.save(currentGame);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
