package com.hva.nl.ewa.models;

public class TreasureDetection {

    private Tile tile;
    private Pawn pawn;
    private int scorePlayer = 0;

    private boolean treasureCard;
    //TODO klasse aanmaken voor treasureCard?

    public TreasureDetection(Tile tile, Pawn pawn) {
        this.tile = tile;
        this.pawn = pawn;
    }

    private boolean checkPlayerHasTreasure() {
        return treasureCard;
    }

    private boolean checkPlayerTile() {
        return this.tile != null;
    }

    private boolean compareTilePawnId() {
        return tile.getTileId() == pawn.getTileId();
    }

    private boolean compareTreasureTile() {
        //return compareTilePawnId() ==
        //TODO treasurecard
        return true;
    }

    private void addPointForPlayer() {
        if (compareTreasureTile()) {
            scorePlayer++;
            removeTreasureCard();
        }
    }

    private void removeTreasureCard() {
        //TODO de huidige Treasure card verwijderen uit voor de speler
    }

    private void checkForNewCard() {
        //TODO controleren of er een nieuwe kaart is voor de speler
    }

    //Getters and Setters
    public int getScorePlayer() {
        return scorePlayer;
    }

    public Tile getTile() {
        return tile;
    }

    public void setTile(Tile tile) {
        this.tile = tile;
    }

    public Pawn getPawn() {
        return pawn;
    }

    public void setPawn(Pawn pawn) {
        this.pawn = pawn;
    }


}
