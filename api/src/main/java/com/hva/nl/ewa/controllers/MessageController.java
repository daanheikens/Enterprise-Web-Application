package com.hva.nl.ewa.controllers;

import static java.lang.String.format;

import com.hva.nl.ewa.DTO.MessageDTO;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.GameService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Set;

@RestController
@Transactional
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;

    private final GameService gameService;

    private final UserService userService;

    @Autowired
    public MessageController(
            SimpMessagingTemplate messagingTemplate,
            GameService gameService,
            UserService userService
    ) {
        this.messagingTemplate = messagingTemplate;
        this.gameService = gameService;
        this.userService = userService;
    }

    /**
     * Endpoint used for notifying a turn
     */
    @MessageMapping("/game/{gameId}/notify")
    public void sendMessage(
            OAuth2Authentication auth,
            @DestinationVariable String gameId,
            @Payload MessageDTO messageDTO
    ) {
        messageDTO.setSender(auth.getName());
        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }

    /**
     * Endpoint used for joining a game
     */
    @MessageMapping("/game/{gameId}/join")
    public void addUser(OAuth2Authentication auth,
                        @DestinationVariable String gameId,
                        @Payload MessageDTO messageDTO
    ) {
        User user = this.userService.loadUserByUsername(auth.getName());
        Game game = this.gameService.findOne(Long.parseLong(gameId));
        if (game == null || user == null) {
            return;
        }

        Set<User> users = game.getUsers();

        if (!users.contains(user) && users.size() >= game.getMaxPlayers()) {
            return;
        }

        messageDTO.setSender(auth.getName());

        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }
}
