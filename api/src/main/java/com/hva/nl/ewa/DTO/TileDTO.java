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

    private boolean topWall;

    private boolean bottomWall;

    private boolean rightWall;

    private boolean leftWall;

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

    public boolean isTopWall() {
        return topWall;
    }

    public void setTopWall(boolean topWall) {
        this.topWall = topWall;
    }

    public boolean isBottomWall() {
        return bottomWall;
    }

    public void setBottomWall(boolean bottomWall) {
        this.bottomWall = bottomWall;
    }

    public boolean isRightWall() {
        return rightWall;
    }

    public void setRightWall(boolean rightWall) {
        this.rightWall = rightWall;
    }

    public boolean isLeftWall() {
        return leftWall;
    }

    public void setLeftWall(boolean leftWall) {
        this.leftWall = leftWall;
    }
}
