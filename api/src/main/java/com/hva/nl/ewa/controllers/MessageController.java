package com.hva.nl.ewa.controllers;

import static java.lang.String.format;

import com.hva.nl.ewa.DTO.MessageDTO;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.Notification;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.NotificationRepository;
import com.hva.nl.ewa.services.GameService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Set;

@RestController
@Transactional
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final GameService gameService;
    private final UserService userService;
    private final NotificationRepository notificationRepository;

    @Autowired
    public MessageController(
            SimpMessagingTemplate messagingTemplate,
            GameService gameService,
            UserService userService,
            NotificationRepository notificationRepository
    ) {
        this.messagingTemplate = messagingTemplate;
        this.gameService = gameService;
        this.userService = userService;
        this.notificationRepository = notificationRepository;
    }

    /**
     * Endpoint used for notifying a turn
     */
    @MessageMapping("/game/{gameId}/notify")
    public void sendMessage(
            OAuth2Authentication auth,
            @DestinationVariable String gameId,
            @Payload MessageDTO messageDTO,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Find the game, and pawn location
        User user = this.userService.loadUserByUsername(auth.getName());
        Game game = this.gameService.findOne(Long.parseLong(gameId));
        if (game == null || user == null) {
            return;
        }

        Tile tile = user.getPawn().getTile();
        // Message about the pawn location
        // Create a notification
        Notification notification = new Notification();
        notification.setGame(game);
        notification.setUser(user);
        notification.setCreationTimestamp(new Date());
        String msg = format("<b>Has moved the pawn to row: %s and column: %s </b>", tile.getxCoordinate() + 1, tile.getyCoordinate() + 1);
        notification.setMessage(msg);
        // Save it
        this.notificationRepository.save(notification);

        headerAccessor.setSessionId(headerAccessor.getSessionAttributes().get("sessionId").toString());
        messageDTO.setSender(auth.getName());

        MessageDTO chatMessage = new MessageDTO();
        chatMessage.setType(MessageDTO.MessageType.CHAT_MESSAGE);
        chatMessage.setContent(msg);
        chatMessage.setSender(auth.getName());

        messagingTemplate.convertAndSend(format("/channel/%s", gameId), chatMessage);
        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }

    /**
     * Endpoint used for notifying a game has ended
     */
    @MessageMapping("/game/{gameId}/finish")
    public void sendGameEndedMessage(
            OAuth2Authentication auth,
            @DestinationVariable String gameId,
            @Payload MessageDTO messageDTO,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        headerAccessor.setSessionId(headerAccessor.getSessionAttributes().get("sessionId").toString());
        messageDTO.setSender(auth.getName());

        // Delete the game here
        this.gameService.delete(Long.parseLong(gameId));

        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }

    /**
     * Endpoint used for sending a chat message
     */
    @MessageMapping("/game/{gameId}/chat")
    public void sendChatMessage(
            OAuth2Authentication auth,
            @DestinationVariable String gameId,
            @Payload MessageDTO messageDTO,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        User user = this.userService.loadUserByUsername(auth.getName());
        Game game = this.gameService.findOne(Long.parseLong(gameId));
        if (game == null || user == null) {
            return;
        }

        headerAccessor.setSessionId(headerAccessor.getSessionAttributes().get("sessionId").toString());
        messageDTO.setSender(auth.getName());

        // Create a notification
        Notification notification = new Notification();
        notification.setGame(game);
        notification.setUser(user);
        notification.setCreationTimestamp(new Date());
        notification.setMessage(messageDTO.getContent());
        // Save it
        this.notificationRepository.save(notification);

        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }

    /**
     * Endpoint used for joining a game
     */
    @MessageMapping("/game/{gameId}/join")
    public void addUser(OAuth2Authentication auth,
                        @DestinationVariable String gameId,
                        @Payload MessageDTO messageDTO,
                        SimpMessageHeaderAccessor headerAccessor
    ) {
        headerAccessor.setSessionId(headerAccessor.getSessionAttributes().get("sessionId").toString());
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
