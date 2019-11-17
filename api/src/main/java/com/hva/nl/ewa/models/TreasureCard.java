package com.hva.nl.ewa.models;

public class TreasureCard {

    private String imgSource;
    private int tileDefinitionId;

    public TreasureCard( int tileDefinitionId, String imgSource) {
        this.tileDefinitionId = tileDefinitionId;
        this.imgSource = imgSource;
    }

    private static final TreasureCard[] TREASURE_CARDS = {
     new TreasureCard(1, TreasureStyle.BATCARD),
     new TreasureCard(2, TreasureStyle.BOOKCARD),
     new TreasureCard(3, TreasureStyle.BUGCARD),
     new TreasureCard(4, TreasureStyle.CANDLECARD),
     new TreasureCard(5, TreasureStyle.CHESTCARD),
     new TreasureCard(6, TreasureStyle.CROWNCARD),
     new TreasureCard(7, TreasureStyle.DRAGONCARD),
     new TreasureCard(8, TreasureStyle.FLYTHINGCARD),
     new TreasureCard(9, TreasureStyle.GEMCARD),
     new TreasureCard(10, TreasureStyle.GHOSTCARD),
     new TreasureCard(11,TreasureStyle.GHOSTUGLYCARD),
     new TreasureCard(12,TreasureStyle.GOLDCARD),
     new TreasureCard(13,TreasureStyle.HELMETCARD),
     new TreasureCard(14,TreasureStyle.KEYSCARD),
     new TreasureCard(15,TreasureStyle.MAPCARD),
     new TreasureCard(16,TreasureStyle.MOUSECARD),
     new TreasureCard(17,TreasureStyle.OWLCARD),
     new TreasureCard(18,TreasureStyle.RINGCARD),
     new TreasureCard(19,TreasureStyle.SALAMANDERCARD),
     new TreasureCard(20,TreasureStyle.SKULLCARD),
     new TreasureCard(21,TreasureStyle.SPIDERCARD),
     new TreasureCard(22,TreasureStyle.SWORDCARD),
     new TreasureCard(23,TreasureStyle.UGLYASSCARD),
     new TreasureCard(24,TreasureStyle.WITCHCARD)
    };
}
