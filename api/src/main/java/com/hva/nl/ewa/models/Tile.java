package com.hva.nl.ewa.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private int TileId;
    @NotNull
    private TileRotation rotation;
    @NotNull
    private Pawn pawn;
    @NotNull
    private boolean treasure;
    @NotNull
    private int tileDefinition;

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
}
