package com.hva.nl.ewa.services;

import com.hva.nl.ewa.helpers.ArrayHelper;
import com.hva.nl.ewa.models.BoardResult;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.TileDefinition;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

@Service
public class BoardService {

    private static final int movableTiles = 33;

    private static Tile[][] GetDefaultBoard() {
        var boardArray = new Tile[7][7];
        boardArray[0][0] = new Tile(null, TileDefinition.GetTile(12));
        boardArray[0][2] = new Tile(null, TileDefinition.GetTile(13));
        boardArray[0][4] = new Tile(null, TileDefinition.GetTile(14));
        boardArray[0][6] = new Tile(null, TileDefinition.GetTile(15));

        boardArray[2][0] = new Tile(null, TileDefinition.GetTile(16);
        boardArray[2][2] = new Tile(null, TileDefinition.GetTile(17));
        boardArray[2][4] = new Tile(null, TileDefinition.GetTile(18));
        boardArray[2][6] = new Tile(null, TileDefinition.GetTile(19));

        boardArray[4][0] = new Tile(null, TileDefinition.GetTile(20));
        boardArray[4][2] = new Tile(null, TileDefinition.GetTile(21));
        boardArray[4][4] = new Tile(null, TileDefinition.GetTile(22));
        boardArray[4][6] = new Tile(null, TileDefinition.GetTile(23));

        boardArray[6][0] = new Tile(null, TileDefinition.GetTile(24));
        boardArray[6][2] = new Tile(null, TileDefinition.GetTile(25));
        boardArray[6][4] = new Tile(null, TileDefinition.GetTile(26));
        boardArray[6][6] = new Tile(null, TileDefinition.GetTile(27));
        return boardArray;
    }

    public BoardResult CreateBoard(){
        var defaultBoard =  GetDefaultBoard();
        var tilesToPlace = GetTilesToPlace();
        return FillBoardRandomly(defaultBoard, tilesToPlace);
    }

    private BoardResult FillBoardRandomly(Tile[][] defaultBoard, Tile[] tilesToPlace) {
        Queue<Tile> randomQueue = new LinkedList<Tile>(Arrays.asList(ArrayHelper.shuffle(tilesToPlace)));
        for (Tile[] tiles : defaultBoard) {
            for (int i = 0; i < tiles.length; i++) {
                Tile tile = tiles[i];
                if (tile == null) {
                    tiles[i] = randomQueue.remove();
                }
            }
        }
        return new BoardResult(defaultBoard, randomQueue.toArray(new Tile[4]));
    }

    private Tile[] GetTilesToPlace() {
        var moveAbleTileDefinitions = TileDefinition.GetMovableTileDefinitions();
        var tiles = new ArrayList<Tile>(movableTiles);
        for (TileDefinition tileDefiniton : moveAbleTileDefinitions) {
            tiles.add(new Tile(null,tileDefiniton));
        }
        while(tiles.size() <= movableTiles){
           tiles.add(GetRandomTile());
        }
        return tiles.toArray(new Tile[movableTiles]);
    }

    private Tile GetRandomTile() {
        var randomTileDef = TileDefinition.GetRandomNormalTile();
        return new Tile(null,randomTileDef);
    }
}
