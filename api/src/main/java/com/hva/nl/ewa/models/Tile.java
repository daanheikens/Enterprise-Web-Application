package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tile")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Tile implements Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long tileId;

    @NotNull
    private TileRotation rotation;

    @JsonIgnore
    @OneToOne(targetEntity = Pawn.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "pawn_id")
    private Pawn pawn;

    @NotNull
    private boolean treasure;

    @NotNull
    private Integer tileDefinition;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private Integer xCoordinate;

    private Integer yCoordinate;

    public Tile() {
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

    public Integer getTileDefinition() {
        return this.tileDefinition;
    }

    public void setTileDefinition(Integer tileDefinition) {
        this.tileDefinition = tileDefinition;
    }

    public TileDefinition getTileDefinitionObject() {
        return TileDefinition.GetTile(this.tileDefinition);
    }

    @JsonIgnore
    public void setTileDefinitionObject(TileDefinition tileDefinition) {
        this.tileDefinition = tileDefinition.getTileDefinitionObjectId();
    }

    public Integer getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(Integer yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public Integer getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(Integer xCoordinate) {
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
