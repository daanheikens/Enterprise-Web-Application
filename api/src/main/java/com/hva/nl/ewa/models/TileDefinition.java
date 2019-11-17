package com.hva.nl.ewa.models;

import com.hva.nl.ewa.helpers.CollectionHelper;

import java.util.Arrays;
import java.util.List;

public class TileDefinition {
    private boolean topWall;
    private boolean bottomWall;
    private boolean rightWall;
    private boolean leftWall;
    private String imgSource;
    private int tileDefinitionId;
    private boolean hasTreasure;

    public TileDefinition(int tileDefinitionId, boolean topWall, boolean bottomWall, boolean rightWall, boolean leftWall,boolean hasTreasure, String imgSource) {
        this.topWall = topWall;
        this.bottomWall = bottomWall;
        this.rightWall = rightWall;
        this.leftWall = leftWall;
        this.imgSource = imgSource;
        this.tileDefinitionId = tileDefinitionId;
    }

    private final static
    TileDefinition[] TileDefinitions = {
            new TileDefinition(1, true, false, false, true, true, TileStyle.MOUSE),
            new TileDefinition(2, true, false, false, true, true,TileStyle.SALAMANDER),
            new TileDefinition(3, false, true, true, false, true,TileStyle.BUG),
            new TileDefinition(4, false, true, false, false, true,TileStyle.DRAGON),
            new TileDefinition(5, true, false, false, true, true,TileStyle.SPIDER),
            new TileDefinition(6, false, false, true, false,true, TileStyle.WITCH),
            new TileDefinition(7, false, true, false, false,true, TileStyle.BAT),
            new TileDefinition(8, true, false, false, false, true,TileStyle.GHOST),
            new TileDefinition(9, false, true, false, false, true,TileStyle.GHOST_UGLY),
            new TileDefinition(10, true, false, false, true, true,TileStyle.OWL),
            new TileDefinition(11, true, false, true, false,true, TileStyle.FLY_THING),
            new TileDefinition(12, true, false, false, true, false,TileStyle.CORNER_BLUE),
            new TileDefinition(13, true, false, false, false, true, TileStyle.HELMET),
            new TileDefinition(14, true, false, false, false, true,TileStyle.CANDLE),
            new TileDefinition(15, true, false, true, true, false,TileStyle.CORNER_GREEN),
            new TileDefinition(16, false, false, false, true, true, TileStyle.SWORD),
            new TileDefinition(17, false, false, false, true, true,TileStyle.GEM),
            new TileDefinition(18, true, false, false, false, true,TileStyle.CHEST),
            new TileDefinition(19, false, false, true, false, true,TileStyle.RING),
            new TileDefinition(20, false, false, false, true, true,TileStyle.SKULL),
            new TileDefinition(21, false, true, false, false, true,TileStyle.KEYS),
            new TileDefinition(22, false, false, true, false, true,TileStyle.CROWN),
            new TileDefinition(23, false, false, true, false, true,TileStyle.MAP),
            new TileDefinition(24, false, true, false, true, false,TileStyle.CORNER_YELLOW),
            new TileDefinition(25, false, true, false, false, true,TileStyle.GOLD),
            new TileDefinition(26, false, true, false, false, true,TileStyle.BOOK),
            new TileDefinition(27, false, true, true, true, false, TileStyle.CORNER_RED),
            new TileDefinition(28, false, true, true, true, false,TileStyle.CORNER),
            new TileDefinition(29, false, true, true, true, false,TileStyle.STRAIGHT),
            new TileDefinition(30, true, true, false, false, true,TileStyle.UGLY_ASS)
    };

    public static TileDefinition GetTile(int tileDefinitionId) {
        return TileDefinitions[tileDefinitionId-1];
    }

    public static List<TileDefinition> GetMovableTileDefinitions(){
        var partOfMovableTiles = Arrays.copyOfRange(TileDefinitions,0,10);
        return CollectionHelper.combine(partOfMovableTiles, Arrays.copyOfRange(TileDefinitions,27,29));
    }

    public static TileDefinition GetRandomNormalTile() {
        if(Math.random() < 0.5){
            return GetTile(29);
        }
        else{
            return GetTile(28);
        }
    }

    public int getTileDefinitionId() {
        return tileDefinitionId;
    }

    boolean hasTreasure() {
        return hasTreasure;
    }
}
