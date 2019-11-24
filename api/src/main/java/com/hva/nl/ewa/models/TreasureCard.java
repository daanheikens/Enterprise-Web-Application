package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "treasureCard")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TreasureCard implements Model {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long treasureID;

    @JsonIgnore
    @OneToOne(targetEntity = Tile.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tile_id")
    private Tile tile_id;

    public TreasureCard(long treasureId) {
        this.treasureID = treasureId;
    }

    public void setTreasureID(long treasureID) {
        this.treasureID = treasureID;
    }

    public Tile getTileID() {
        return tile_id;
    }

    public void setTileID(Tile tile_id) {
        this.tile_id = tile_id;
    }

    public long getTreasureID() {
        return treasureID;
    }


}

