package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.BoardResult;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.TileDefinition;
import com.hva.nl.ewa.models.TileRotation;
import com.hva.nl.ewa.repositories.TileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoardService {

    private final TileRepository tileRepository;

    @Autowired
    public BoardService(TileRepository tileRepository) {
        this.tileRepository = tileRepository;
    }

    // 32 + 1 since we need to have a placeabletile
    private static final int movableTiles = 33;

    private static Tile[][] GetDefaultBoard() {
        Tile[][] boardArray = new Tile[7][7];
        int startDefinitionId = 12;

        for (int y = 0; y <= 6; y += 2) {
            for (int x = 0; x <= 6; x += 2) {
                Tile tile = new Tile();
                tile.setPawn(null);
                TileDefinition tileDefinition = TileDefinition.GetTile(startDefinitionId);
                tile.setTileDefinitionObject(tileDefinition);
                tile.setTreasure(tileDefinition.hasTreasure());
                tile.setRotation(TileRotation.Zero);
                tile.setxCoordinate(x);
                tile.setyCoordinate(y);
                tile.setTopWall(tileDefinition.isTopWall());
                tile.setBottomWall(tileDefinition.isBottomWall());
                tile.setLeftWall(tileDefinition.isLeftWall());
                tile.setRightWall(tileDefinition.isRightWall());
                boardArray[x][y] = tile;
                startDefinitionId++;
            }
        }

        return boardArray;
    }

    public BoardResult CreateBoard() {
        Tile[][] defaultBoard = GetDefaultBoard();
        List<Tile> tilesToPlace = GetTilesToPlace();
        return FillBoardRandomly(defaultBoard, tilesToPlace);
    }

    private BoardResult FillBoardRandomly(Tile[][] defaultBoard, List<Tile> tilesToPlace) {
        Collections.shuffle(tilesToPlace);
        Queue<Tile> randomQueue = new LinkedList<>(tilesToPlace);
        for (int x = 0; x < defaultBoard.length; x++) {
            Tile[] tiles = defaultBoard[x];
            for (int y = 0; y < tiles.length; y++) {
                Tile tile = tiles[y];
                if (tile == null) {
                    tiles[y] = randomQueue.remove();
                    tiles[y].setxCoordinate(y);
                    tiles[y].setyCoordinate(x);
                }
            }
        }

        // This is the placeabletile.
        Tile tile = randomQueue.remove();

        return new BoardResult(defaultBoard, randomQueue.toArray(new Tile[4]), this.tileRepository.save(tile));
    }

    private List<Tile> GetTilesToPlace() {
        var moveAbleTileDefinitions = TileDefinition.GetMovableTileDefinitions();
        var tiles = new ArrayList<Tile>(movableTiles);
        for (TileDefinition tileDefiniton : moveAbleTileDefinitions) {
            Tile tile = new Tile();
            tile.setPawn(null);
            tile.setTileDefinitionObject(tileDefiniton);
            tile.setTreasure(tileDefiniton.hasTreasure());
            tile.setRotation(TileRotation.Zero);
            tile.setTopWall(tileDefiniton.isTopWall());
            tile.setBottomWall(tileDefiniton.isBottomWall());
            tile.setLeftWall(tileDefiniton.isLeftWall());
            tile.setRightWall(tileDefiniton.isRightWall());
            tiles.add(tile);
        }
        while (tiles.size() <= movableTiles) {
            tiles.add(GetRandomTile());
        }
        return tiles;
    }

    private Tile GetRandomTile() {
        Tile tile = new Tile();
        tile.setPawn(null);
        TileDefinition tileDefinition = TileDefinition.GetRandomNormalTile();
        tile.setTileDefinitionObject(tileDefinition);
        tile.setTreasure(tileDefinition.hasTreasure());
        tile.setRotation(TileRotation.Zero);
        tile.setTopWall(tileDefinition.isTopWall());
        tile.setBottomWall(tileDefinition.isBottomWall());
        tile.setLeftWall(tileDefinition.isLeftWall());
        tile.setRightWall(tileDefinition.isRightWall());
        return tile;
    }
}
