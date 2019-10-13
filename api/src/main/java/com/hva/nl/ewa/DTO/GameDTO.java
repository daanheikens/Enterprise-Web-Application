package com.hva.nl.ewa.DTO;

public class GameDTO {

    private long id;

    private int maxPlayers;

    private int maxTurnTime;

    private int maxPendingTime;

    private int currentPlayers;

    public GameDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getCurrentPlayers() {
        return currentPlayers;
    }

    public void setCurrentPlayers(int currentPlayers) {
        this.currentPlayers = currentPlayers;
    }
}
