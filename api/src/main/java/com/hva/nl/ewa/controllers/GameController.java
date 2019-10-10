package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.GameService;
import com.hva.nl.ewa.services.UserService;
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

import java.util.List;

@RestController
@RequestMapping(value = "/api/game", produces = MediaType.APPLICATION_JSON_VALUE)
public class GameController {

    private final GameService gameService;

    private final UserService userService;

    @Autowired
    public GameController(GameService gameService, UserService userService) {
        this.gameService = gameService;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Game> create(
            OAuth2Authentication auth,
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
        game.setMaxPlayers(maxPlayers);
        game.setMaxTurnTime(maxTurnTime);
        game.setMaxPendingTime(maxPendingTime);
        game.addUser(user);
        return new ResponseEntity<>(this.gameService.save(game), new HttpHeaders(), HttpStatus.CREATED);
    }
}
