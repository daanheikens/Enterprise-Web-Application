package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

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
    private Set<Card> cards = new HashSet<>();

    @JsonIgnore
    @OneToOne(targetEntity = Tile.class, fetch = FetchType.LAZY)
    private Tile placeableTile;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User userTurn;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User userPlacedTile;

    @JsonIgnore
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("creationTimestamp asc")
    private Set<Notification> notifications = new HashSet<>();

    @NotNull
    @ColumnDefault("0")
    private boolean privateGame;

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

    public void assignUserCards(User user) {
        List<Card> userCards = this.cards.stream()
                .filter(row -> row.getUser() == null)
                .limit(24/this.getMaxPlayers()).collect(Collectors.toList());
        this.cards.removeAll(userCards);

        for (Card userCard : userCards) {
            userCard.setGame(this);
        }

        user.addCards(userCards);
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

    public void drawCards(){
        this.cards = new HashSet<>(Card.DrawCards());
        for (Card card : this.cards) {
            card.setGame(this);
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
        return this.privateGame;
    }

    public void setPrivate(boolean aPrivate) {
        this.privateGame = aPrivate;
    }

    public Set<Notification> getNotifications() {
        return this.notifications;
    }
}
