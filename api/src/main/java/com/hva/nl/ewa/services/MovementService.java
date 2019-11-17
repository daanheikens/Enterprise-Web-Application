package com.hva.nl.ewa.services;

import com.hva.nl.ewa.helpers.Offset;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.Pawn;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.hva.nl.ewa.validators.MovementDirections.*;

@Service
public class MovementService {

    private final GameService gameService;

    @Autowired
    public MovementService(GameService gameService) {
        this.gameService = gameService;
    }

    public boolean move(String direction, User user) {
        Game game = this.gameService.getCurrentGame(user);

        if (game == null) {
            return false;
        }

        int xOffset = 0;
        int yOffset = 0;

        switch (direction) {
            case MOVEMENT_UP:
                xOffset = -1;
                break;
            case MOVEMENT_DOWN:
                xOffset = 1;
                break;
            case MOVEMENT_LEFT:
                yOffset = -1;
                break;
            case MOVEMENT_RIGHT:
                yOffset = 1;
                break;
            default:
                return false;
        }

        Tile[][] tilesArray = new Tile[7][7];
        Tile userTile = null;

        for (Tile t : game.getTiles()) {
            tilesArray[t.getxCoordinate()][t.getyCoordinate()] = t;
            Pawn pawn = t.getPawn();
            if (pawn != null && pawn.equals(user.getPawn())) {
                userTile = t;
            }
        }

        if (userTile == null) {
            return false;
        }

        if ((xOffset > 0 && this.movePawn(userTile, tilesArray, xOffset, Offset.X)) || (yOffset > 0 && this.movePawn(userTile, tilesArray, yOffset, Offset.Y))) {
            this.gameService.save(game);
            return true;
        }

        return false;
    }

    private boolean movePawn(Tile userTile, Tile[][] tilesArray, int offsetModdifier, Offset offset) {
        if (Offset.isXOffset(offset)) {
            return this.moveX(tilesArray, userTile, offsetModdifier);
        } else if (Offset.isYOffset(offset)) {
            return this.moveY(tilesArray, userTile, offsetModdifier);
        }

        return false;
    }

    private boolean moveX(Tile[][] tilesArray, Tile userTile, int offsetModdifier) {
        Tile targetTile = null;

        try {
            targetTile = tilesArray[userTile.getxCoordinate() + offsetModdifier][userTile.getyCoordinate()];
        } catch (ArrayIndexOutOfBoundsException e) {
            return false;
        }

        if (offsetModdifier == -1 && targetTile.getTileDefinition().isBottomWall() && userTile.getTileDefinition().isTopWall()) {
            return false;
        }

        if (offsetModdifier == 1 && targetTile.getTileDefinition().isTopWall() && userTile.getTileDefinition().isBottomWall()) {
            return false;
        }

        targetTile.setPawn(userTile.getPawn());
        userTile.setPawn(null);

        return true;
    }

    private boolean moveY(Tile[][] tilesArray, Tile userTile, int offsetModdifier) {
        Tile targetTile = null;

        try {
            targetTile = tilesArray[userTile.getxCoordinate()][userTile.getyCoordinate() + offsetModdifier];
        } catch (ArrayIndexOutOfBoundsException e) {
            return false;
        }

        if (offsetModdifier == -1 && targetTile.getTileDefinition().isRightWall() && userTile.getTileDefinition().isLeftWall()) {
            return false;
        }

        if (offsetModdifier == 1 && targetTile.getTileDefinition().isLeftWall() && userTile.getTileDefinition().isRightWall()) {
            return false;
        }

        targetTile.setPawn(userTile.getPawn());
        userTile.setPawn(null);

        return true;
    }
}
