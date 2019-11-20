package com.hva.nl.ewa.models;

public class BoardResult {
    private Tile[][] board;
    private Tile[] playerTiles;
    private Tile placeableTile;

    public BoardResult(Tile[][] board, Tile[] playerTiles, Tile placeableTile) {
        this.board = board;
        this.playerTiles = playerTiles;
        this.placeableTile = placeableTile;
    }

    public Tile[][] getTiles() {
        return board;
    }

    public Tile[] getPlayerTiles() {
        return playerTiles;
    }

    public Tile getPlaceableTile() {
        return this.placeableTile;
    }
}
