package com.hva.nl.ewa.models;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.lessThan;
import static org.junit.Assert.assertThat;

/*
 * @author Sebastiaan van de Griendt
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TileDefinitionTest {


    TileDefinition var = TileDefinition.GetTile(30);
    List<TileDefinition> movableTile = TileDefinition.GetMovableTileDefinitions();
    TileDefinition tile = new TileDefinition(1, true, true, true, true, true, null, TreasureStyle.BATCARD);
    TileDefinition tile2 = new TileDefinition(2, true, true, true, true, false, null, TreasureStyle.BOOKCARD);

    @Test
    public void getTileReturnsSuccesfulIDTest() {
        Assert.assertEquals(30, var.getTileDefinitionId());
    }

    @Test
    public void getTileReturnsOutOfBoundsTest() {
        Assertions.assertThatThrownBy(() -> TileDefinition.GetTile(31)).isInstanceOf(ArrayIndexOutOfBoundsException.class);
        Assertions.assertThatThrownBy(() -> TileDefinition.GetTile(0)).isInstanceOf(ArrayIndexOutOfBoundsException.class);
        Assertions.assertThatThrownBy(() -> TileDefinition.GetTile(-1)).isInstanceOf(ArrayIndexOutOfBoundsException.class);
    }

    @Test
    public void hasTreasureReturnsTest() {
        Assert.assertTrue(tile.hasTreasure());
        Assert.assertFalse(tile2.hasTreasure());
    }

    @Test
    public void randomNormalTileReturnsCorrect() {
        for (int i = 0; i < 9; i++) {
            var var = TileDefinition.GetRandomNormalTile();
            assertThat(var.getTileDefinitionId(), anyOf(is(29), is(28)));
        }
    }

    @Test
    public void movableTileReturnsCorrect(){
        for (TileDefinition id : movableTile){
            assertThat(id.getTileDefinitionId(), is(not(both(greaterThan(10)).and(lessThan(27)))));
        }
    }

    @Test
    public void movableTileReturnsIncorrect(){
        for (TileDefinition id : movableTile){
            assertThat(id.getTileDefinitionId(), is(either(greaterThan(26)).or(lessThan(11))));
        }
    }



}
