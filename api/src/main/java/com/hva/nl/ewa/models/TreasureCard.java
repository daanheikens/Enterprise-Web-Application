package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hva.nl.ewa.helpers.CollectionHelper;
import org.hibernate.internal.util.collections.ArrayHelper;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Table(name = "treasureCard")
public class TreasureCard implements Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long id;

    @NotNull
    private TreasureStyle treasureStyle;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    public boolean IsOnTile(Tile tile){
        return tile.getTileDefinition().getTreasureStyle() == this.treasureStyle;
    }

    public static TreasureCard[] GetNewCardSet(){
        return TREASURE_CARDS;
    }

    public TreasureCard(long treasureId, TreasureStyle cardStyle) {
        this.id = treasureId;
        this.treasureStyle = cardStyle;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    static List<TreasureCard> DrawCards(){
        var list = Arrays.asList(TREASURE_CARDS);
        Collections.shuffle(list);
        return list;
    }

    private static final TreasureCard[] TREASURE_CARDS = {
            new TreasureCard(0, TreasureStyle.BATCARD),
            new TreasureCard(1, TreasureStyle.BOOKCARD),
            new TreasureCard(2, TreasureStyle.BUGCARD),
            new TreasureCard(3, TreasureStyle.CANDLECARD),
            new TreasureCard(4, TreasureStyle.CHESTCARD),
            new TreasureCard(5, TreasureStyle.CROWNCARD),
            new TreasureCard(6, TreasureStyle.DRAGONCARD),
            new TreasureCard(7, TreasureStyle.FLYTHINGCARD),
            new TreasureCard(8, TreasureStyle.GEMCARD),
            new TreasureCard(9, TreasureStyle.GHOSTCARD),
            new TreasureCard(10, TreasureStyle.GHOSTUGLYCARD),
            new TreasureCard(11, TreasureStyle.GOLDCARD),
            new TreasureCard(12, TreasureStyle.HELMETCARD),
            new TreasureCard(13, TreasureStyle.KEYSCARD),
            new TreasureCard(14, TreasureStyle.MAPCARD),
            new TreasureCard(15, TreasureStyle.MOUSECARD),
            new TreasureCard(16, TreasureStyle.OWLCARD),
            new TreasureCard(17, TreasureStyle.RINGCARD),
            new TreasureCard(18, TreasureStyle.SALAMANDERCARD),
            new TreasureCard(19, TreasureStyle.SKULLCARD),
            new TreasureCard(20, TreasureStyle.SPIDERCARD),
            new TreasureCard(21, TreasureStyle.SWORDCARD),
            new TreasureCard(22, TreasureStyle.UGLYASSCARD),
            new TreasureCard(23, TreasureStyle.WITCHCARD)
    };

}

