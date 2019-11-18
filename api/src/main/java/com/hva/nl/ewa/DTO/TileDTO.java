package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.Pawn;
import com.hva.nl.ewa.models.TileRotation;

public class TileDTO {

    private long tileId;

    private TileRotation rotation;

    private Pawn pawn;

    private String imgSrc;

    private boolean treasure;

    private int tileDefinition;

    private int xCoordinate;

    private int yCoordinate;

    public TileDTO() {
    }

    public long getTileId() {
        return tileId;
    }

    public void setTileId(long tileId) {
        this.tileId = tileId;
    }

    public TileRotation getRotation() {
        return rotation;
    }

    public void setRotation(TileRotation rotation) {
        this.rotation = rotation;
    }

    public Pawn getPawn() {
        return pawn;
    }

    public void setPawn(Pawn pawn) {
        this.pawn = pawn;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public boolean isTreasure() {
        return treasure;
    }

    public void setTreasure(boolean treasure) {
        this.treasure = treasure;
    }

    public int getTileDefinition() {
        return tileDefinition;
    }

    public void setTileDefinition(int tileDefinition) {
        this.tileDefinition = tileDefinition;
    }

    public int getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(int xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public int getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(int yCoordinate) {
        this.yCoordinate = yCoordinate;
    }
}
