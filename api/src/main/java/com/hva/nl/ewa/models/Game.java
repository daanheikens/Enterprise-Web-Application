package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.FluentIterable;
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
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private Set<TreasureCard> treasureCards = new HashSet<>();

    @JsonIgnore
    @OneToOne(targetEntity = Tile.class, fetch = FetchType.LAZY)
    private Tile placeableTile;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User userTurn;

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
        this.assignUserCards(user);
    }

    private void assignUserCards(User user) {
        var userCards = FluentIterable.from(this.treasureCards)
                .limit(24/this.maxPlayers)
                .toList();
        this.treasureCards.removeAll(userCards);
        user.addCards(userCards);
    }

    public Set<User> getUsers() {
        return users;
    }


    public void setInitiator(User user) {
        initiator = user;
    }

    public void setTiles(Tile[][] tiles) {
        for (Tile[] tile : tiles) {
            this.tiles.addAll(Arrays.asList(tile));
            for (Tile tile1 : tile) {
                tile1.setGame(this);
            }
        }
    }

    public void drawCards(){
        this.treasureCards = new HashSet<>(TreasureCard.DrawCards());
    }

    public Set<Tile> getTiles() {
        return this.tiles;
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
}
