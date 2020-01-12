package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.DTO.CardDTO;
import com.hva.nl.ewa.helpers.modelmappers.DefaultModelMapper;
import com.hva.nl.ewa.models.Card;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.CardRepository;
import com.hva.nl.ewa.repositories.GameRepository;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.OperationNotSupportedException;
import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping(value = "/api/cards", produces = MediaType.APPLICATION_JSON_VALUE)
public class CardController {

    private UserService userService;
    private CardRepository cardRepository;
    private GameRepository gameRepository;
    private DefaultModelMapper modelMapper;

    @Autowired
    public CardController(UserService userService,
                          CardRepository cardRepository,
                          GameRepository gameRepository,
                          DefaultModelMapper modelMapper){
        this.userService = userService;
        this.cardRepository = cardRepository;
        this.gameRepository = gameRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<CardDTO> current(@RequestParam(name = "gameId") long gameId, OAuth2Authentication auth)
            throws OperationNotSupportedException {
        User user = this.userService.loadUserByUsername(auth.getName());

        Game game = gameRepository.findById(gameId).orElseThrow(OperationNotSupportedException::new);
        Card card = cardRepository.findFirstByUserAndGameAndCollectedIsFalse(user, game);

        return new ResponseEntity<>(
                this.modelMapper.ModelToDTO(card, CardDTO.class),
                new HttpHeaders(),
                HttpStatus.CREATED
        );
    }
}
