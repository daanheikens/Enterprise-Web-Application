package com.hva.nl.ewa.controllers;

import static java.lang.String.format;

import com.hva.nl.ewa.DTO.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Endpoint used for notifying a turn
     */
    @MessageMapping("/game/{gameId}/notify")
    public void sendMessage(@DestinationVariable String gameId, @Payload MessageDTO messageDTO) {
        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }

    /**
     * Endpoint used for joining a game
     */
    @MessageMapping("/game/{gameId}/join")
    public void addUser(@DestinationVariable String gameId, @Payload MessageDTO messageDTO,
                        SimpMessageHeaderAccessor headerAccessor) {

        // TODO: Build in access_token check
        // TOOD: Build in maxPlayer check AND userId check (To not hijack game)
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            headerAccessor.setSessionAttributes(new HashMap<>());
        }

        String currentGameId = (String) headerAccessor.getSessionAttributes().put("game_id", gameId);
        // Leave other room (This is just in case another is still open)
        if (currentGameId != null) {
            MessageDTO leaveMessageDTO = new MessageDTO();
            leaveMessageDTO.setType(MessageDTO.MessageType.LEAVE);
            leaveMessageDTO.setSender(messageDTO.getSender());
            messagingTemplate.convertAndSend(format("/channel/%s", currentGameId), leaveMessageDTO);
        }
        headerAccessor.getSessionAttributes().put("username", messageDTO.getSender());
        messagingTemplate.convertAndSend(format("/channel/%s", gameId), messageDTO);
    }
}
