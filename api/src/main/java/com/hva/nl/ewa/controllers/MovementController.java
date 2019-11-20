package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.User;
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

@RestController
@Transactional
@RequestMapping(value = "/api/movement", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovementController {

    private final MovementService movementService;

    private final UserService userService;

    @Autowired
    public MovementController(MovementService movementService, UserService userService) {
        this.movementService = movementService;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Boolean> move(OAuth2Authentication auth, @RequestParam(name = "direction") String direction) {
        String username = auth.getName();

        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = this.userService.loadUserByUsername(username);

        boolean validMove = this.movementService.move(direction, user);

        if (!validMove) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
}
