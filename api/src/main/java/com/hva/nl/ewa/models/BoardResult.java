package com.hva.nl.ewa.models;

public class BoardResult {
    private Tile[][] board;
    private Tile[] playerTiles;

    public BoardResult(Tile[][] board, Tile[] playerTiles) {
        this.board = board;
        this.playerTiles = playerTiles;
    }

    public Tile[][] getBoard() {
        return board;
    }

    public Tile[] getPlayerTiles() {
        return playerTiles;
    }
}