package com.hva.nl.ewa.models;

import java.util.ArrayList;
import java.util.List;

public class TileDefinition {
    private boolean topWall;
    private boolean bottomWall;
    private boolean rightWall;
    private boolean leftWall;
    private String imgSource;
    private int tileDefinitionId;

    private TileDefinition(int tileDefinitionId, boolean topWall, boolean bottomWall, boolean rightWall, boolean leftWall, String imgSource) {
        this.topWall = topWall;
        this.bottomWall = bottomWall;
        this.rightWall = rightWall;
        this.leftWall = leftWall;
        this.imgSource = imgSource;
        this.tileDefinitionId = tileDefinitionId;
    }

    private final static
    TileDefinition[] TileDefinitions = {
            new TileDefinition(1, true, false, false, true, TileStyle.MOUSE),
            new TileDefinition(2, true, false, false, true, TileStyle.SALAMANDER),
            new TileDefinition(3, false, true, true, false, TileStyle.BUG),
            new TileDefinition(4, false, true, false, false, TileStyle.DRAGON),
            new TileDefinition(5, true, false, false, true, TileStyle.SPIDER),
            new TileDefinition(6, false, false, true, false, TileStyle.WITCH),
            new TileDefinition(7, false, true, false, false, TileStyle.BAT),
            new TileDefinition(8, true, false, false, false, TileStyle.GHOST),
            new TileDefinition(9, false, true, false, false, TileStyle.GHOST_UGLY),
            new TileDefinition(10, true, false, false, true, TileStyle.OWL),
            new TileDefinition(11, true, false, true, false, TileStyle.FLY_THING),
            new TileDefinition(12, true, false, false, true, TileStyle.CORNER_BLUE),
            new TileDefinition(13, true, false, false, false, TileStyle.HELMET),
            new TileDefinition(14, true, false, false, false, TileStyle.CANDLE),
            new TileDefinition(15, true, false, true, true, TileStyle.CORNER_GREEN),
            new TileDefinition(16, false, false, false, true, TileStyle.SWORD),
            new TileDefinition(17, false, false, false, true, TileStyle.GEM),
            new TileDefinition(18, true, false, false, false, TileStyle.CHEST),
            new TileDefinition(19, false, false, true, false, TileStyle.RING),
            new TileDefinition(20, false, false, false, true, TileStyle.SKULL),
            new TileDefinition(21, false, true, false, false, TileStyle.KEYS),
            new TileDefinition(22, false, false, true, false, TileStyle.CROWN),
            new TileDefinition(23, false, false, true, false, TileStyle.MAP),
            new TileDefinition(24, false, true, false, true, TileStyle.CORNER_YELLOW),
            new TileDefinition(25, false, true, false, false, TileStyle.GOLD),
            new TileDefinition(26, false, true, false, false, TileStyle.BOOK),
            new TileDefinition(27, false, true, true, true, TileStyle.CORNER_RED),
            new TileDefinition(28, false, true, true, true, TileStyle.CORNER),
            new TileDefinition(29, false, true, true, true, TileStyle.STRAIGHT),
            new TileDefinition(30, true, true, false, false, TileStyle.UGLY_ASS)
    };
}
