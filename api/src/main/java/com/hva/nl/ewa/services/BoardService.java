package com.hva.nl.ewa.services;

import com.hva.nl.ewa.helpers.ArrayHelper;
import com.hva.nl.ewa.models.BoardResult;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.TileDefinition;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoardService {

    private static final int movableTiles = 33;

    private static Tile[][] GetDefaultBoard() {
        var boardArray = new Tile[7][7];
        boardArray[0][0] = new Tile(null, TileDefinition.GetTile(12),0,0);
        boardArray[0][2] = new Tile(null, TileDefinition.GetTile(13),0,2);
        boardArray[0][4] = new Tile(null, TileDefinition.GetTile(14),0,4);
        boardArray[0][6] = new Tile(null, TileDefinition.GetTile(15),0,6);

        boardArray[2][0] = new Tile(null, TileDefinition.GetTile(16),2,0);
        boardArray[2][2] = new Tile(null, TileDefinition.GetTile(17),2,2);
        boardArray[2][4] = new Tile(null, TileDefinition.GetTile(18),2,4);
        boardArray[2][6] = new Tile(null, TileDefinition.GetTile(19),2,6);

        boardArray[4][0] = new Tile(null, TileDefinition.GetTile(20),4,0);
        boardArray[4][2] = new Tile(null, TileDefinition.GetTile(21),4,2);
        boardArray[4][4] = new Tile(null, TileDefinition.GetTile(22), 4,4);
        boardArray[4][6] = new Tile(null, TileDefinition.GetTile(23), 4,6 );

        boardArray[6][0] = new Tile(null, TileDefinition.GetTile(24),6,0);
        boardArray[6][2] = new Tile(null, TileDefinition.GetTile(25),6,2);
        boardArray[6][4] = new Tile(null, TileDefinition.GetTile(26),6,4);
        boardArray[6][6] = new Tile(null, TileDefinition.GetTile(27),6,6);
        return boardArray;
    }

    public BoardResult CreateBoard(){
        var defaultBoard =  GetDefaultBoard();
        var tilesToPlace = GetTilesToPlace();
        return FillBoardRandomly(defaultBoard, tilesToPlace);
    }

    private BoardResult FillBoardRandomly(Tile[][] defaultBoard, List<Tile> tilesToPlace) {
        Collections.shuffle(tilesToPlace);
        Queue<Tile> randomQueue = new LinkedList<>(tilesToPlace);
        for (int y = 0; y < defaultBoard.length; y++) {
            Tile[] tiles = defaultBoard[y];
            for (int x = 0; x < tiles.length; x++) {
                Tile tile = tiles[x];
                if (tile == null) {
                    tiles[x] = randomQueue.remove();
                    tiles[x].setxCoordinate(x);
                    tiles[x].setyCoordinate(y);
                }
            }
        }
        return new BoardResult(defaultBoard, randomQueue.toArray(new Tile[4]));
    }

    private List<Tile> GetTilesToPlace() {
        var moveAbleTileDefinitions = TileDefinition.GetMovableTileDefinitions();
        var tiles = new ArrayList<Tile>(movableTiles);
        for (TileDefinition tileDefiniton : moveAbleTileDefinitions) {
            tiles.add(new Tile(null,tileDefiniton));
        }
        while(tiles.size() <= movableTiles){
           tiles.add(GetRandomTile());
        }
        return tiles;
    }

    private Tile GetRandomTile() {
        var randomTileDef = TileDefinition.GetRandomNormalTile();
        return new Tile(null,randomTileDef);
    }
}
