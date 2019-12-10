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
    private boolean hasTreasure;
    private TreasureStyle treasureStyle;

    public TileDefinition(int tileDefinitionId, boolean topWall, boolean bottomWall, boolean rightWall, boolean leftWall, boolean hasTreasure, String imgSrc, TreasureStyle treasureStyle) {
        this.topWall = topWall;
        this.bottomWall = bottomWall;
        this.rightWall = rightWall;
        this.leftWall = leftWall;
        this.imgSrc = imgSrc;
        this.tileDefinitionId = tileDefinitionId;
        this.treasureStyle = treasureStyle;
    }

    private final static
    TileDefinition[] TileDefinitions = {
            new TileDefinition(1, true, false, false, true, true, TileStyle.MOUSE, TreasureStyle.MOUSECARD),
            new TileDefinition(2, true, false, false, true, true, TileStyle.SALAMANDER, TreasureStyle.SALAMANDERCARD),
            new TileDefinition(3, false, true, true, false, true, TileStyle.BUG, TreasureStyle.BUGCARD),
            new TileDefinition(4, false, true, false, false, true, TileStyle.DRAGON, TreasureStyle.DRAGONCARD),
            new TileDefinition(5, true, false, false, true, true, TileStyle.SPIDER, TreasureStyle.SPIDERCARD),
            new TileDefinition(6, false, false, true, false, true, TileStyle.WITCH, TreasureStyle.WITCHCARD),
            new TileDefinition(7, false, true, false, false, true, TileStyle.BAT, TreasureStyle.BATCARD),
            new TileDefinition(8, false, true, false, false, true, TileStyle.GHOST, TreasureStyle.GHOSTCARD),
            new TileDefinition(9, false, true, false, false, true, TileStyle.GHOST_UGLY, TreasureStyle.GHOSTUGLYCARD),
            new TileDefinition(10, true, false, false, true, true, TileStyle.OWL, TreasureStyle.OWLCARD),
            new TileDefinition(11, true, false, true, false, true, TileStyle.FLY_THING, TreasureStyle.FLYTHINGCARD),
            new TileDefinition(12, true, false, false, true, false, TileStyle.CORNER_BLUE, TreasureStyle.NONE),
            new TileDefinition(13, true, false, false, false, true, TileStyle.HELMET, TreasureStyle.HELMETCARD),
            new TileDefinition(14, true, false, false, false, true, TileStyle.CANDLE, TreasureStyle.CANDLECARD),
            new TileDefinition(15, true, false, true, false, false, TileStyle.CORNER_GREEN, TreasureStyle.NONE),
            new TileDefinition(16, false, false, false, true, true, TileStyle.SWORD, TreasureStyle.SWORDCARD),
            new TileDefinition(17, false, false, false, true, true, TileStyle.GEM, TreasureStyle.GEMCARD),
            new TileDefinition(18, true, false, false, false, true, TileStyle.CHEST, TreasureStyle.CHESTCARD),
            new TileDefinition(19, false, false, true, false, true, TileStyle.RING, TreasureStyle.RINGCARD),
            new TileDefinition(20, false, false, false, true, true, TileStyle.SKULL, TreasureStyle.SKULLCARD),
            new TileDefinition(21, false, true, false, false, true, TileStyle.KEYS, TreasureStyle.KEYSCARD),
            new TileDefinition(22, false, false, true, false, true, TileStyle.CROWN, TreasureStyle.CROWNCARD),
            new TileDefinition(23, false, false, true, false, true, TileStyle.MAP, TreasureStyle.MAPCARD),
            new TileDefinition(24, false, true, false, true, false, TileStyle.CORNER_YELLOW, TreasureStyle.NONE),
            new TileDefinition(25, false, true, false, false, true, TileStyle.GOLD, TreasureStyle.GOLDCARD),
            new TileDefinition(26, false, true, false, false, true, TileStyle.BOOK, TreasureStyle.BOOKCARD),
            new TileDefinition(27, false, true, true, true, false, TileStyle.CORNER_RED, TreasureStyle.NONE),
            new TileDefinition(28, false, true, false, true, false, TileStyle.CORNER, TreasureStyle.NONE),
            new TileDefinition(29, true, true, false, false, false, TileStyle.STRAIGHT, TreasureStyle.NONE),
            new TileDefinition(30, true, true, false, false, true, TileStyle.UGLY_ASS, TreasureStyle.UGLYASSCARD)
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

    boolean hasTreasure() {
        return hasTreasure;
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

    public TreasureStyle getTreasureStyle() {
        return this.treasureStyle;
    }
}
