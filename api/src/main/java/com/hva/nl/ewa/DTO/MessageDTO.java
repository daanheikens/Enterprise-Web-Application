package com.hva.nl.ewa.DTO;

public class MessageDTO {
    private MessageType type;
    private String content;
    private String sender;

    public enum MessageType {
        TURN_ENDED,
        JOIN_GAME,
        LEAVE_GAME,
        CHAT_MESSAGE,
        END_GAME
    }

    public MessageDTO() {
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
