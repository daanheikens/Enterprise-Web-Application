package com.hva.nl.ewa.models;

public class TreasureCardDefinition {

    private String imgSource;
    private long treasureID;

    public TreasureCardDefinition(long treasureID, String imgSource) {
        this.treasureID = treasureID;
        this.imgSource = imgSource;
    }

    public long getTreasureID() {
        return treasureID;
    }

    private static final TreasureCardDefinition[] TREASURE_CARDS = {
     new TreasureCardDefinition(0, TreasureStyle.BATCARD),
     new TreasureCardDefinition(1, TreasureStyle.BOOKCARD),
     new TreasureCardDefinition(2, TreasureStyle.BUGCARD),
     new TreasureCardDefinition(3, TreasureStyle.CANDLECARD),
     new TreasureCardDefinition(4, TreasureStyle.CHESTCARD),
     new TreasureCardDefinition(5, TreasureStyle.CROWNCARD),
     new TreasureCardDefinition(6, TreasureStyle.DRAGONCARD),
     new TreasureCardDefinition(7, TreasureStyle.FLYTHINGCARD),
     new TreasureCardDefinition(8, TreasureStyle.GEMCARD),
     new TreasureCardDefinition(9, TreasureStyle.GHOSTCARD),
     new TreasureCardDefinition(10,TreasureStyle.GHOSTUGLYCARD),
     new TreasureCardDefinition(11,TreasureStyle.GOLDCARD),
     new TreasureCardDefinition(12,TreasureStyle.HELMETCARD),
     new TreasureCardDefinition(13,TreasureStyle.KEYSCARD),
     new TreasureCardDefinition(14,TreasureStyle.MAPCARD),
     new TreasureCardDefinition(15,TreasureStyle.MOUSECARD),
     new TreasureCardDefinition(16,TreasureStyle.OWLCARD),
     new TreasureCardDefinition(17,TreasureStyle.RINGCARD),
     new TreasureCardDefinition(18,TreasureStyle.SALAMANDERCARD),
     new TreasureCardDefinition(19,TreasureStyle.SKULLCARD),
     new TreasureCardDefinition(20,TreasureStyle.SPIDERCARD),
     new TreasureCardDefinition(21,TreasureStyle.SWORDCARD),
     new TreasureCardDefinition(22,TreasureStyle.UGLYASSCARD),
     new TreasureCardDefinition(23,TreasureStyle.WITCHCARD)
    };
}
