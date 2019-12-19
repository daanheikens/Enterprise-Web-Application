package com.hva.nl.ewa.models;

import com.hva.nl.ewa.helpers.CollectionHelper;

import java.util.Arrays;
import java.util.List;

public class TileDefinition {
    private boolean topWall;
    private boolean bottomWall;
    private boolean rightWall;
    private boolean leftWall;
    private String imgSrc;
    private int tileDefinitionId;
    private TreasureCardDefinition treasureID;

    public TileDefinition(int tileDefinitionId, boolean topWall, boolean bottomWall, boolean rightWall, boolean leftWall, TreasureCardDefinition treasureCardDefinition, String imgSrc) {
        this.topWall = topWall;
        this.bottomWall = bottomWall;
        this.rightWall = rightWall;
        this.leftWall = leftWall;
        this.imgSrc = imgSrc;
        this.tileDefinitionId = tileDefinitionId;
        this.treasureID = treasureCardDefinition.getTreasureID2();
    }

    public TileDefinition(int tileDefinitionId, boolean topWall, boolean bottomWall, boolean rightWall, boolean leftWall, String imgSrc) {
        this.topWall = topWall;
        this.bottomWall = bottomWall;
        this.rightWall = rightWall;
        this.leftWall = leftWall;
        this.imgSrc = imgSrc;
        this.tileDefinitionId = tileDefinitionId;
    }

    private final static
    TileDefinition[] TileDefinitions = {
            new TileDefinition(1, true, false, false, true, TreasureCardDefinition.getTreasureID2() , TileStyle.MOUSE),

//            new TileDefinition(2, true, false, false, true, 18, TileStyle.SALAMANDER),
//            new TileDefinition(3, false, true, true, false, 2, TileStyle.BUG),
//            new TileDefinition(4, false, true, false, false, 6, TileStyle.DRAGON),
//            new TileDefinition(5, true, false, false, true, 20, TileStyle.SPIDER),
//            new TileDefinition(6, false, false, true, false, 23, TileStyle.WITCH),
//            new TileDefinition(7, false, true, false, false, 0, TileStyle.BAT),
//            new TileDefinition(8, false, true, false, false, 9, TileStyle.GHOST),
//            new TileDefinition(9, false, true, false, false, 10, TileStyle.GHOST_UGLY),
//            new TileDefinition(10, true, false, false, true, 16, TileStyle.OWL),
//            new TileDefinition(11, true, false, true, false, 7, TileStyle.FLY_THING),
//            new TileDefinition(12, true, false, false, true,  TileStyle.CORNER_BLUE),
//            new TileDefinition(13, true, false, false, false, 12, TileStyle.HELMET),
//            new TileDefinition(14, true, false, false, false, 3, TileStyle.CANDLE),
//            new TileDefinition(15, true, false, true, false, 99, TileStyle.CORNER_GREEN),
//            new TileDefinition(16, false, false, false, true, 21, TileStyle.SWORD),
//            new TileDefinition(17, false, false, false, true, 8, TileStyle.GEM),
//            new TileDefinition(18, true, false, false, false, 4, TileStyle.CHEST),
//            new TileDefinition(19, false, false, true, false, 17, TileStyle.RING),
//            new TileDefinition(20, false, false, false, true, 19, TileStyle.SKULL),
//            new TileDefinition(21, false, true, false, false, 13, TileStyle.KEYS),
//            new TileDefinition(22, false, false, true, false, 5, TileStyle.CROWN),
//            new TileDefinition(23, false, false, true, false, 14, TileStyle.MAP),
//            new TileDefinition(24, false, true, false, true, TileStyle.CORNER_YELLOW),
//            new TileDefinition(25, false, true, false, false, 11, TileStyle.GOLD),
//            new TileDefinition(26, false, true, false, false, 1, TileStyle.BOOK),
//            new TileDefinition(27, false, true, true, true,  TileStyle.CORNER_RED),
//            new TileDefinition(28, false, true, false, true,  TileStyle.CORNER),
//            new TileDefinition(29, true, true, false, false,  TileStyle.STRAIGHT),
//            new TileDefinition(30, true, true, false, false, 22, TileStyle.UGLY_ASS)
    };

    public static TileDefinition GetTile(int tileDefinitionId) {
        return TileDefinitions[tileDefinitionId - 1];
    }

    public static List<TileDefinition> GetMovableTileDefinitions() {
        var partOfMovableTiles = Arrays.copyOfRange(TileDefinitions, 0, 10);
        return CollectionHelper.combine(partOfMovableTiles, Arrays.copyOfRange(TileDefinitions, 27, 29));
    }

    public static TileDefinition GetRandomNormalTile() {
        if (Math.random() < 0.5) {
            return GetTile(29);
        } else {
            return GetTile(28);
        }
    }

    public int getTileDefinitionId() {
        return tileDefinitionId;
    }

    public boolean isTopWall() {
        return topWall;
    }

    public boolean isBottomWall() {
        return bottomWall;
    }

    public boolean isRightWall() {
        return rightWall;
    }

    public boolean isLeftWall() {
        return leftWall;
    }

    public String getImgSrc() {
        return imgSrc;
    }
}
