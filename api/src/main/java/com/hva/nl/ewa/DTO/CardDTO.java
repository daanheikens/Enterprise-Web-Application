package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.TreasureStyle;

public class CardDTO {

    private long id;

    private String treasureStyle;

    private boolean collected;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTreasureStyle() {
        return treasureStyle;
    }

    public void setTreasureStyle(TreasureStyle treasureStyle) {
        this.treasureStyle = treasureStyle.getPath();
    }

    public boolean isCollected() {
        return collected;
    }

    public void setCollected(boolean collected) {
        this.collected = collected;
    }
}
