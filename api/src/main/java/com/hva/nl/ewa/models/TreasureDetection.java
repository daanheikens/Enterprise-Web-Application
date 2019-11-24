package com.hva.nl.ewa.models;

public class TreasureDetection {

    private Tile tile;
    private Pawn pawn;
    private int scorePlayer = 0;
    private TreasureCard treasureCard;


    public TreasureDetection(Tile tile, Pawn pawn) {
        this.tile = tile;
        this.pawn = pawn;
    }


    public TreasureCard getTreasureCard() {
        return treasureCard;
    }

    public void setTreasureCard(TreasureCard treasureCard) {
        this.treasureCard = treasureCard;
    }

    private boolean checkPlayerTile() {
        if( this.tile != null){

        }
        return true;
    }

    private boolean compareTreasureTile() {
        return tile.getTileId() == treasureCard.getTreasureID();

    }

    private void addPointForPlayer() {
        if (compareTreasureTile()) {
            scorePlayer++;
            //removeTreasureCard();
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
