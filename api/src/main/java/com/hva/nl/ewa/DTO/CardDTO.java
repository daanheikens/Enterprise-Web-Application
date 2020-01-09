package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.TreasureStyle;
import com.hva.nl.ewa.models.User;

public class CardDTO {

    private long id;

    private TreasureStyle treasureStyle;

    private User user;

    private Game game;

    private boolean collected;

    public void setId(long id) {
        this.id = id;
    }

    public void setCollected(boolean collected) {
        this.collected = collected;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTreasureStyle(TreasureStyle treasureStyle) {
        this.treasureStyle = treasureStyle;
    }

    public long getId() {
        return id;
    }
}
