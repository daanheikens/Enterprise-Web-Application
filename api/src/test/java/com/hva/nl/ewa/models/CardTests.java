package com.hva.nl.ewa.models;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;


/**
 * @author Lars Bruins Slot
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class CardTests {

    private Card card;
    @Before
    public void Before(){
        card = new Card();
    }

    @Test(expected = IllegalArgumentException.class)
    public void testSetGame() {
        //call method expect exception
        card.setGame(null);
    }

    @Test
    public void testDrawCards(){
        //draw cards twice
        var cards1 = Card.DrawCards();
        var cards2 = Card.DrawCards();
        var cards3 = Card.DrawCards();

        //the collections should be different.
        Assert.assertNotSame(cards1,cards2);
        Assert.assertNotSame(cards1,cards3);
        Assert.assertNotSame(cards2,cards3);

        //the collections should be 24 cards long
        Assert.assertEquals(cards1.size(),24);
        Assert.assertEquals(cards2.size(),24);
    }

    @Test
    public void isOnTile(){
        //createTile
        var tile = new Tile();
        tile.setTreasure(true);
        tile.setTileDefinition(1);

        //create card
        card = new Card(TreasureStyle.MOUSECARD);

        Assert.assertTrue(card.IsOnTile(tile));
    }

    @Test
    public void setId(){
        //createcard
        var card1 = new Card();
        var card2 = new Card();
        var card3 = new Card();

        //run checks
        card1.setId(1);
        card2.setId(0);
        assertThat(card1.getId(), is(1L));
        assertThat(card2.getId(), is(0L));
        card3.setId(-1);
        assertThat(card3.getId(),is(0L));
    }
}
