package com.hva.nl.ewa.models;

import javax.persistence.Id;
import javax.persistence.ManyToOne;

public class Pawn {

    @Id
    @ManyToOne()
    private User user;

    @Id
    private int gameId;

    private int tileId;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getTileId() {
        return tileId;
    }

    public void setTileId(int tileId) {
        this.tileId = tileId;
    }
}
