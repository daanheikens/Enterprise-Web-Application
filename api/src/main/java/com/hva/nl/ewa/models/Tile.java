package com.hva.nl.ewa.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private int TileId;

    @NotNull
    private TileRotation rotation;

    @Null
    private Pawn pawn;

    @NotNull
    private boolean treasure;

    @NotNull
    private int tileDefinition;

    @OneToMany
    @NotNull
    private Game game;

    @NotNull
    private int xCoordinate;

    @NotNull
    private int yCoordinate;

    public Tile(Pawn pawn, TileDefinition tileDefinition, int initialYCoordinate, int initialXCoordinate) {
        this.rotation = TileRotation.Zero;
        this.pawn = pawn;
        this.treasure = tileDefinition.hasTreasure();
        this.tileDefinition = tileDefinition.getTileDefinitionId();
        this.xCoordinate = initialXCoordinate;
        this.yCoordinate = initialYCoordinate;
    }

    public Tile(Pawn pawn, TileDefinition tileDefinition) {
        this.rotation = TileRotation.Zero;
        this.pawn = pawn;
        this.treasure = tileDefinition.hasTreasure();
        this.tileDefinition = tileDefinition.getTileDefinitionId();
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

    public boolean isTreasure() {
        return treasure;
    }

    public void setTreasure(boolean treasure) {
        this.treasure = treasure;
    }

    public TileDefinition getTileDefinition() {
        return TileDefinition.GetTile(tileDefinition);
    }

    public void setTileDefinition(TileDefinition tileDefinition) {
        this.tileDefinition = tileDefinition.getTileDefinitionId();
    }

    public int getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(int yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public int getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(int xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public int getTileId() {
        return TileId;
    }

    public void setTileId(int tileId) {
        TileId = tileId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
