package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    private int tileDefinition;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private Integer xCoordinate;

    private Integer yCoordinate;

    public Tile() {
    }

    public Tile(Pawn pawn, TileDefinition tileDefinition) {
        this.rotation = TileRotation.Zero;
        this.pawn = pawn;
        this.tileDefinition = tileDefinition.getTileDefinitionId();
    }

    public Tile(Pawn pawn, TileDefinition tileDefinition, int initialYCoordinate, int initialXCoordinate) {
        this.rotation = TileRotation.Zero;
        this.pawn = pawn;
        this.tileDefinition = tileDefinition.getTileDefinitionId();
        this.xCoordinate = initialXCoordinate;
        this.yCoordinate = initialYCoordinate;
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


    public TileDefinition getTileDefinition() {
        return TileDefinition.GetTile(tileDefinition);
    }

    public void setTileDefinition(TileDefinition tileDefinition) {
        this.tileDefinition = tileDefinition.getTileDefinitionId();
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

    public boolean hasCard(Card card) {
        return card.IsOnTile(this);
    }

}
