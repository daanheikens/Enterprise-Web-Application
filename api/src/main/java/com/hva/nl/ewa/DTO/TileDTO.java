package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.TileRotation;

public class TileDTO {

    private long tileId;

    private TileRotation rotation;

    private PawnDTO pawn;

    private String imgSrc;

    private boolean treasure;

    private Integer tileDefinition;

    private Integer xCoordinate;

    private Integer yCoordinate;

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

    public PawnDTO getPawnDTO() {
        return pawn;
    }

    public void setPawnDTO(PawnDTO pawn) {
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

    public Integer getTileDefinition() {
        return tileDefinition;
    }

    public void setTileDefinition(Integer tileDefinition) {
        this.tileDefinition = tileDefinition;
    }

    public Integer getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(Integer xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public Integer getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(Integer yCoordinate) {
        this.yCoordinate = yCoordinate;
    }
}
