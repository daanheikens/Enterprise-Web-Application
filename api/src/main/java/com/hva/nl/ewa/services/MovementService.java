package com.hva.nl.ewa.services;

import com.hva.nl.ewa.helpers.Offset;
import com.hva.nl.ewa.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.hva.nl.ewa.validators.MovementDirections.*;

@Service
public class MovementService {

    private final GameService gameService;

    private final PawnService pawnService;

    @Autowired
    public MovementService(GameService gameService, PawnService pawnService) {
        this.gameService = gameService;
        this.pawnService = pawnService;
    }

    public boolean move(String direction, User user) {
        Game game = this.gameService.getCurrentGame(user);

        if (game == null || game.getUserTurn() == null || !game.getUserTurn().equals(user)) {
            return false;
        }

        int xOffset = 0;
        int yOffset = 0;

        switch (direction) {
            case MOVEMENT_UP:
                yOffset = -1;
                break;
            case MOVEMENT_DOWN:
                yOffset = 1;
                break;
            case MOVEMENT_LEFT:
                xOffset = -1;
                break;
            case MOVEMENT_RIGHT:
                xOffset = 1;
                break;
            default:
                return false;
        }

        Tile[][] tilesArray = new Tile[7][7];
        Tile userTile = null;

        for (Tile t : game.getTiles()) {
            if (t.equals(game.getPlaceableTile())) {
                continue;
            }
            tilesArray[t.getxCoordinate()][t.getyCoordinate()] = t;
            Pawn pawn = t.getPawn();
            if (pawn != null && pawn.equals(user.getPawn())) {
                userTile = t;
            }
        }

        if (userTile == null) {
            return false;
        }

        Pawn pawn = userTile.getPawn();

        if ((xOffset != 0 && this.movePawn(userTile, tilesArray, xOffset, Offset.X, pawn)) ||
                (yOffset != 0 && this.movePawn(userTile, tilesArray, yOffset, Offset.Y, pawn))) {
            this.pawnService.save(pawn);
            this.gameService.save(game);
            return true;
        }

        return false;
    }

    private boolean movePawn(Tile userTile, Tile[][] tilesArray, int offsetModdifier, Offset offset, Pawn pawn) {
        if (Offset.isXOffset(offset)) {
            return this.moveX(tilesArray, userTile, offsetModdifier, pawn);
        } else if (Offset.isYOffset(offset)) {
            return this.moveY(tilesArray, userTile, offsetModdifier, pawn);
        }

        return false;
    }

    private boolean moveX(Tile[][] tilesArray, Tile userTile, int offsetModdifier, Pawn pawn) {
        Tile targetTile;

        try {
            targetTile = tilesArray[userTile.getxCoordinate() + offsetModdifier][userTile.getyCoordinate()];
        } catch (ArrayIndexOutOfBoundsException e) {
            return false;
        }

        if (offsetModdifier == -1 && (targetTile.isRightWall() || userTile.isLeftWall())) {
            return false;
        }

        if (offsetModdifier == 1 && (targetTile.isLeftWall() || userTile.isRightWall())) {
            return false;
        }

        userTile.setPawn(null);
        targetTile.setPawn(pawn);
        pawn.setTile(targetTile);

        return true;
    }

    private boolean moveY(Tile[][] tilesArray, Tile userTile, int offsetModdifier, Pawn pawn) {
        Tile targetTile = null;

        try {
            targetTile = tilesArray[userTile.getxCoordinate()][userTile.getyCoordinate() + offsetModdifier];
        } catch (ArrayIndexOutOfBoundsException e) {
            return false;
        }

        if (offsetModdifier == -1 && (targetTile.isBottomWall() || userTile.isTopWall())) {
            return false;
        }

        if (offsetModdifier == 1 && (targetTile.isTopWall() || userTile.isBottomWall())) {
            return false;
        }

        // expect not able to move at all
        targetTile.setPawn(pawn);
        userTile.setPawn(null);
        pawn.setTile(targetTile);

        return true;
    }
}
