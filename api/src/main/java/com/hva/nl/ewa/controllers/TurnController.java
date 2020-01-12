package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.Card;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.models.turns.TurnResult;
import com.hva.nl.ewa.models.turns.TurnResultAction;
import com.hva.nl.ewa.repositories.CardRepository;
import com.hva.nl.ewa.services.GameService;
import com.hva.nl.ewa.services.MovementService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import javax.validation.constraints.Null;

@RestController
@Transactional
@RequestMapping(value = "/api/turn", produces = MediaType.APPLICATION_JSON_VALUE)
public class TurnController {
    private final MovementService movementService;
    private final UserService userService;
    private final GameService gameService;
    private final CardRepository cardRepository;

    @Autowired
    public TurnController(
            MovementService movementService,
            UserService userService,
            GameService gameService,
            CardRepository cardRepository
    ) {
        this.movementService = movementService;
        this.userService = userService;
        this.gameService = gameService;
        this.cardRepository = cardRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<TurnResult> move(OAuth2Authentication auth, @RequestParam(name = "direction") String direction) {
        String username = auth.getName();

        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = this.userService.loadUserByUsername(username);

        boolean validMove = this.movementService.move(direction, user);

        if (!validMove) {
            return ResponseEntity.ok(new TurnResult(TurnResultAction.INVALID_MOVE));
        }

        Tile currentTile = user.getPawn().getTile();
        Game game = this.gameService.getCurrentGame(user);

        if (currentTile == null || game == null) {
            return ResponseEntity.unprocessableEntity().build();
        }

        if (!currentTile.isTreasure()) {
            return ResponseEntity.ok(new TurnResult(TurnResultAction.VALID_MOVE));
        }

        Card card = this.cardRepository.findFirstByUserAndGameAndCollectedIsFalse(user, game);

        if (card == null) {
            return ResponseEntity.unprocessableEntity().build();
        }

        if (currentTile.hasCard(card)) {
            card.collect();
            this.cardRepository.save(card);
            int treasureCount = this.cardRepository.countByUserAndGameAndCollectedIsFalse(user, game);
            if (treasureCount == 0) {
                game.finishGame();
                this.gameService.save(game);
                return ResponseEntity.ok(new TurnResult(TurnResultAction.GAME_END));
            }

            return ResponseEntity.ok(new TurnResult(TurnResultAction.COLLECTED_TREASURE));
        }

        return ResponseEntity.ok(new TurnResult(TurnResultAction.VALID_MOVE));
    }
}
