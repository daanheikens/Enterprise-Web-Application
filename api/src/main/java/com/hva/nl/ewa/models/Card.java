package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "card")
public class Card implements Model {

    public Card() {
    }

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
    @ManyToOne(targetEntity = Game.class, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "game_id")
    private Game game;

    @NotNull
    @Column(columnDefinition = "boolean default FALSE")
    private boolean collected;

    public boolean IsOnTile(Tile tile) {
        return TileDefinition.GetTile(tile.getTileDefinition()).getTreasureStyle() == this.treasureStyle;
    }

    public static Card[] GetNewCardSet() {
        return TREASURE_CARDS;
    }

    public Card(TreasureStyle cardStyle) {
        this.treasureStyle = cardStyle;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    static List<Card> DrawCards() {
        var list = Arrays.asList(TREASURE_CARDS);
        Collections.shuffle(list);
        return list;
    }

    private static final Card[] TREASURE_CARDS = new Card[]{
            new Card(TreasureStyle.BATCARD),
            new Card(TreasureStyle.BOOKCARD),
            new Card(TreasureStyle.BUGCARD),
            new Card(TreasureStyle.CANDLECARD),
            new Card(TreasureStyle.CHESTCARD),
            new Card(TreasureStyle.CROWNCARD),
            new Card(TreasureStyle.DRAGONCARD),
            new Card(TreasureStyle.FLYTHINGCARD),
            new Card(TreasureStyle.GEMCARD),
            new Card(TreasureStyle.GHOSTCARD),
            new Card(TreasureStyle.GHOSTUGLYCARD),
            new Card(TreasureStyle.GOLDCARD),
            new Card(TreasureStyle.HELMETCARD),
            new Card(TreasureStyle.KEYSCARD),
            new Card(TreasureStyle.MAPCARD),
            new Card(TreasureStyle.MOUSECARD),
            new Card(TreasureStyle.OWLCARD),
            new Card(TreasureStyle.RINGCARD),
            new Card(TreasureStyle.SALAMANDERCARD),
            new Card(TreasureStyle.SKULLCARD),
            new Card(TreasureStyle.SPIDERCARD),
            new Card(TreasureStyle.SWORDCARD),
            new Card(TreasureStyle.UGLYASSCARD),
            new Card(TreasureStyle.WITCHCARD)
    };

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isCollected() {
        return this.collected;
    }

    public void collect() {
        this.collected = true;
    }

    public TreasureStyle getTreasureStyle() {
        return treasureStyle;
    }
}

