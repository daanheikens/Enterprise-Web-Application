package com.hva.nl.ewa.helpers;

import com.hva.nl.ewa.exceptions.PawnPlacerException;
import com.hva.nl.ewa.models.Pawn;
import com.hva.nl.ewa.models.Tile;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class PawnPlacer {

    public static void placePawnOnInitialTile(Pawn pawn, Set<Tile> tiles, int totalUsers) throws PawnPlacerException {
        Map<Integer, Map<Integer, Integer>> coordinates = new HashMap<>();
        Map<Integer, Integer> xymap = new HashMap<>();

        switch (totalUsers) {
            case 1:
                xymap.put(0, 0);
                coordinates.put(1, xymap);
                break;
            case 2:
                xymap.put(6, 0);
                coordinates.put(2, xymap);
                break;
            case 3:
                xymap.put(0, 6);
                coordinates.put(3, xymap);
                break;
            case 4:
                xymap.put(6, 6);
                coordinates.put(4, xymap);
                break;
            default:
                throw new PawnPlacerException("Invalid Integer supplied to method. Only 1 - 4 is accepted");
        }

        Tile[][] tilesArray = new Tile[7][7];

        for (Tile t : tiles) {
            if (t.getyCoordinate() != null && t.getyCoordinate() != null) {
                tilesArray[t.getxCoordinate()][t.getyCoordinate()] = t;
            }

        }

        for (Map.Entry<Integer, Integer> position : coordinates.get(totalUsers).entrySet()) {
            tilesArray[position.getKey()][position.getValue()].setPawn(pawn);
            pawn.setTile(tilesArray[position.getKey()][position.getValue()]);
        }
    }
}
