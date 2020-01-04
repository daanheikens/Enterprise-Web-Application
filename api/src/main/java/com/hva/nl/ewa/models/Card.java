package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hva.nl.ewa.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Table(name = "card")
public class Card implements Model {

    public Card(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long id;

    @NotNull
    private TreasureStyle treasureStyle;

    @JsonIgnore
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    public boolean IsOnTile(Tile tile){
        return TileDefinition.GetTile(tile.getTileDefinition()).getTreasureStyle() == this.treasureStyle;
    }

    public static Card[] GetNewCardSet(){
        return TREASURE_CARDS;
    }

    public Card(long treasureId, TreasureStyle cardStyle) {
        this.id = 0;
        this.treasureStyle = cardStyle;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    static List<Card> DrawCards(){
        var list = Arrays.asList(TREASURE_CARDS);
        Collections.shuffle(list);
        return list;
    }

    private static final Card[] TREASURE_CARDS = {
            new Card(0, TreasureStyle.BATCARD),
            new Card(1, TreasureStyle.BOOKCARD),
            new Card(2, TreasureStyle.BUGCARD),
            new Card(3, TreasureStyle.CANDLECARD),
            new Card(4, TreasureStyle.CHESTCARD),
            new Card(5, TreasureStyle.CROWNCARD),
            new Card(6, TreasureStyle.DRAGONCARD),
            new Card(7, TreasureStyle.FLYTHINGCARD),
            new Card(8, TreasureStyle.GEMCARD),
            new Card(9, TreasureStyle.GHOSTCARD),
            new Card(10, TreasureStyle.GHOSTUGLYCARD),
            new Card(11, TreasureStyle.GOLDCARD),
            new Card(12, TreasureStyle.HELMETCARD),
            new Card(13, TreasureStyle.KEYSCARD),
            new Card(14, TreasureStyle.MAPCARD),
            new Card(15, TreasureStyle.MOUSECARD),
            new Card(16, TreasureStyle.OWLCARD),
            new Card(17, TreasureStyle.RINGCARD),
            new Card(18, TreasureStyle.SALAMANDERCARD),
            new Card(19, TreasureStyle.SKULLCARD),
            new Card(20, TreasureStyle.SPIDERCARD),
            new Card(21, TreasureStyle.SWORDCARD),
            new Card(22, TreasureStyle.UGLYASSCARD),
            new Card(23, TreasureStyle.WITCHCARD)
    };

}

