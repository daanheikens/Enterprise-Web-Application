package com.hva.nl.ewa.models;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


/**
 * @author Lars Bruins Slot
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class CardTests {

    @Test
    public void testSetGame() {
        //create a card
        var card = new Card();

        //call method expect exception
        card.setGame(null);
    }

    public void testDrawCards(){
        //draw cards twice
        var cards1 = Card.DrawCards();
        var cards2 = Card.DrawCards();
        var cards3 = Card.DrawCards();

        //the collections should be different.
        Assert.assertNotEquals(cards1,cards2);
        Assert.assertNotSame(cards1,cards3);
        Assert.assertNotSame(cards2,cards3);

        //the collections should be 24 cards long
        Assert.assertEquals(cards1.size(),24);
        Assert.assertEquals(cards2.size(),24);
    }

    public void isOnTile(){
        //createTile
        var tile = new Tile();
        tile.setTreasure(true);
        tile.setTileDefinition(1);

        //create card
        var card = new Card(TreasureStyle.MOUSECARD);

        Assert.assertTrue(card.IsOnTile(tile));
    }
}
