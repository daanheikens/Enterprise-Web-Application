package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.Tile;

public class BoardDTO {

    private Tile[][] tiles;

    private Tile placeableTile;

    public BoardDTO() {
    }

    public Tile[][] getTiles() {
        return tiles;
    }

    public void setTiles(Tile[][] tiles) {
        this.tiles = tiles;
    }

    public Tile getPlaceableTile() {
        return placeableTile;
    }

    public void setPlaceableTile(Tile placeableTile) {
        this.placeableTile = placeableTile;
    }
}
