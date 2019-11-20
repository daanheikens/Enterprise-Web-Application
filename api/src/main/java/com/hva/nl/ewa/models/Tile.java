package com.hva.nl.ewa.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Entity
@Table(name = "tile")
public class Tile implements Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long tileId;

    @NotNull
    private TileRotation rotation;

    @OneToOne(targetEntity = Pawn.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "pawn_id")
    private Pawn pawn;

    @NotNull
    private boolean treasure;

    @NotNull
    private int tileDefinition;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @NotNull
    private int xCoordinate;

    @NotNull
    private int yCoordinate;

    public Tile() {
    }

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

    public long getTileId() {
        return tileId;
    }

    public void setTileId(long tileId) {
        this.tileId = tileId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
