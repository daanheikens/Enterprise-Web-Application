package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.DTO.GameDTO;
import com.hva.nl.ewa.exceptions.PawnPlacerException;
import com.hva.nl.ewa.helpers.PawnPlacer;
import com.hva.nl.ewa.helpers.modelmappers.DefaultModelMapper;
import com.hva.nl.ewa.helpers.TimeHelper;
import com.hva.nl.ewa.models.*;
import com.hva.nl.ewa.services.BoardService;
import com.hva.nl.ewa.services.GameService;
import com.hva.nl.ewa.services.PawnService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public GameController(
            GameService gameService,
            UserService userService,
            DefaultModelMapper modelMapper,
            BoardService boardService,
            PawnService pawnService
    ) {
        this.gameService = gameService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.boardService = boardService;
        this.pawnService = pawnService;
    }

    @RequestMapping(method = RequestMethod.POST)
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
        Pawn pawn = new Pawn();

        pawn.setUser(user);
        pawn.setGame(game);

        pawn.setTile(tiles[0][0]);
        this.pawnService.save(pawn);

        tiles[0][0].setPawn(pawn);
        game.setTiles(tiles);
        game.setInitiator(user);


        /**
         * 1. Create a new pawn and attach this game and current user to it
         * 2. This pawn should be attached to the tile top-left: that's index 0-0
         * 3. Save the pawn
         * 4. Save the game
         */
        return new ResponseEntity<>(
                this.modelMapper.ModelToDTO(this.gameService.save(game), GameDTO.class),
                new HttpHeaders(),
                HttpStatus.CREATED
        );
    }

    @RequestMapping(method = RequestMethod.GET)
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
            dto.setCurrentPlayers(game.getUsers().size());
            gameDTOs.add(dto);
        }

        return new ResponseEntity<>(gameDTOs, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET)
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
        dto.setCurrentPlayers(currentGame.getUsers().size());

        return new ResponseEntity<>(dto, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/join", method = RequestMethod.POST)
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
        PawnPlacer.placePawnOnInitialTile(pawn, tiles, users.size());

        this.pawnService.save(pawn);
        this.gameService.save(game);

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }
}
