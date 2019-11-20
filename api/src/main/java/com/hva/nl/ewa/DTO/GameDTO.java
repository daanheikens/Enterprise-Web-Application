package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.User;

import java.util.Set;

public class GameDTO {

    private long id;

    private String name;

    private int maxPlayers;

    private int maxTurnTime;

    private int maxPendingTime;

    private Set<User> currentPlayers;

    private TileDTO[][] matrix;

    private User user;

    private User userTurn;

    private TileDTO placeAbleTile;

    public GameDTO(){
    }

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

    public Set<User> getCurrentPlayers() {
        return currentPlayers;
    }

    public void setCurrentPlayers(Set<User> currentPlayers) {
        this.currentPlayers = currentPlayers;
    }

    public TileDTO[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(TileDTO[][] matrix) {
        this.matrix = matrix;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUserTurn() {
        return userTurn;
    }

    public void setUserTurn(User userTurn) {
        this.userTurn = userTurn;
    }

    public TileDTO getPlaceAbleTile() {
        return placeAbleTile;
    }

    public void setPlaceAbleTile(TileDTO placeAbleTile) {
        this.placeAbleTile = placeAbleTile;
    }
}
