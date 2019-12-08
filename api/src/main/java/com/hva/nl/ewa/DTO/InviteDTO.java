package com.hva.nl.ewa.DTO;

public class InviteDTO {

    private long inviteId;

    private String inviterName;

    private GameDTO game;

    public long getInviteId() {
        return inviteId;
    }

    public void setInviteId(long inviteId) {
        this.inviteId = inviteId;
    }

    public String getInviterName() {
        return inviterName;
    }

    public void setInviterName(String inviterName) {
        this.inviterName = inviterName;
    }

    public GameDTO getGame() {
        return game;
    }

    public void setGame(GameDTO game) {
        this.game = game;
    }
}
