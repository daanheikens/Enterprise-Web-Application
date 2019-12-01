package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hva.nl.ewa.DTO.TileDTO;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Table(name = "game")
public class Game implements Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long id;

    @NotNull
    private String name;

    @NotNull
    private int maxPlayers;

    @NotNull
    private int maxTurnTime;

    @NotNull
    private int maxPendingTime;

    @NotNull
    @CreationTimestamp
    private Date creationDate;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_games",
            joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User initiator;

    @JsonIgnore
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private Set<Tile> tiles = new HashSet<>();

    @JsonIgnore
    @OneToOne(targetEntity = Tile.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Tile placeableTile;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User userTurn;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User userPlacedTile;

    @NotNull
    @ColumnDefault("0")
    private boolean isPrivate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(int maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public int getMaxTurnTime() {
        return maxTurnTime;
    }

    public void setMaxTurnTime(int maxTurnTime) {
        this.maxTurnTime = maxTurnTime;
    }

    public int getMaxPendingTime() {
        return maxPendingTime;
    }

    public void setMaxPendingTime(int maxPendingTime) {
        this.maxPendingTime = maxPendingTime;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setInitiator(User user) {
        initiator = user;
    }

    public User getInitiator() {
        return this.initiator;
    }

    public void setTiles(Tile[][] tiles) {
        for (Tile[] tile : tiles) {
            this.tiles.addAll(Arrays.asList(tile));
            for (Tile tile1 : tile) {
                tile1.setGame(this);
            }
        }
    }

    public void setTilesFromSet(Set<Tile> tiles) {
        this.tiles = tiles;
    }

    public Set<Tile> getTiles() {
        return this.tiles;
    }

    public Map<Long, Tile> getTilesAsMap() {
        Map<Long, Tile> tiles = new TreeMap<>();

        for (Tile t : this.getTiles()) {
            tiles.put(t.getTileId(), t);
        }

        return tiles;
    }

    public Tile getPlaceableTile() {
        return placeableTile;
    }

    public void setPlaceableTile(Tile placeableTile) {
        this.placeableTile = placeableTile;
    }

    public User getUserTurn() {
        return userTurn;
    }

    public void setUserTurn(User userTurn) {
        this.userTurn = userTurn;
    }

    public User getUserPlacedTile() {
        return userPlacedTile;
    }

    public void setUserPlacedTile(User userPlacedTile) {
        this.userPlacedTile = userPlacedTile;
    }

    public boolean isPrivate() {
        return this.isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        this.isPrivate = aPrivate;
    }
}
