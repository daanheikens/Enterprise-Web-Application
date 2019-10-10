package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/game", produces = MediaType.APPLICATION_JSON_VALUE)
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Game> create(
            OAuth2Authentication auth,
            @RequestParam("maxPlayers") Integer maxPlayers,
            @RequestParam("maxTurnTime") Integer maxTurnTime,
            @RequestParam("maxPendingTime") Integer maxPendingTime
    ) {

        Game game = new Game();
        game.setMaxPlayers(maxPlayers);
        game.setMaxTurnTime(maxTurnTime);
        game.setMaxPendingTime(maxPendingTime);
        // Add current user from token
        Object obj = auth.getCredentials();
        return new ResponseEntity<>(this.gameService.save(game), new HttpHeaders(), HttpStatus.CREATED);
    }
}
