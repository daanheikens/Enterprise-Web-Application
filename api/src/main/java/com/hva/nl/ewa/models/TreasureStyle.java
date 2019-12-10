package com.hva.nl.ewa.models;

public enum  TreasureStyle {
    BATCARD("/assets/images/cards/bat.png"),
    BOOKCARD("/assets/images/cards/book.png"),
    BUGCARD("/assets/images/cards/bug.png"),
    CANDLECARD("/assets/images/cards/candle.png"),
    CHESTCARD("/assets/images/cards/chest.png"),
    CROWNCARD("/assets/images/cards/crown.png"),
    DRAGONCARD("/assets/images/cards/dragon.png"),
    FLYTHINGCARD("/assets/images/cards/fly-thing.png"),
    GEMCARD("/assets/images/cards/gem.png"),
    GHOSTCARD("/assets/images/cards/ghost.png"),
    GHOSTUGLYCARD("/assets/images/cards/ghost-ugly.png"),
    GOLDCARD("/assets/images/cards/gold.png"),
    HELMETCARD("/assets/images/cards/helmet.png"),
    KEYSCARD("/assets/images/cards/keys.png"),
    MAPCARD("/assets/images/cards/map.png"),
    MOUSECARD("/assets/images/cards/mouse.png"),
    OWLCARD("/assets/images/cards/owl.png"),
    RINGCARD("/assets/images/cards/ring.png"),
    SALAMANDERCARD("/assets/images/cards/salamander.png"),
    SKULLCARD("/assets/images/cards/skull.png"),
    SPIDERCARD("/assets/images/cards/spider.png"),
    SWORDCARD("/assets/images/cards/sword.png"),
    UGLYASSCARD("/assets/images/cards/ugly-ass.png"),
    WITCHCARD("/assets/images/cards/witch.png"),
    NONE("none");


    private final String path;

    TreasureStyle(final String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }
}
