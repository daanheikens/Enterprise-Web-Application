package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.repositories.TileRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
 *   @author Sebastiaan van de Griendt
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TileServiceTests {

    @MockBean
    TileRepository tileRepository;

    @Autowired
    @InjectMocks
    TileService tileService;

    private Tile testTile;
    private Tile testTile2;

    @Before
    public void init() {
        this.testTile = new Tile();
        this.testTile2 = new Tile();
        this.testTile.setTileId(1337);
        this.testTile.setTreasure(true);
        this.testTile2.setTileId(42);
        Mockito.when(tileRepository.findById(testTile.getTileId())).thenReturn(Optional.ofNullable(testTile));
        Mockito.when(tileRepository.findById(testTile2.getTileId())).thenReturn(Optional.ofNullable(testTile2));
    }

    @Test
    public void findOneShouldReturnTileObject() {
        Tile tile = tileService.findOne(1337);
        Tile tile2 = tileService.findOne(42);
        Assert.assertSame(testTile, tile);
        Assert.assertEquals(testTile2, tile2);
    }


    @Test
    public void findOneShouldReturnNullTest() {
        Tile tile = tileService.findOne(1);
        Tile tile2 = tileService.findOne(-1);
        Tile tile3 = tileService.findOne(0);
        Assert.assertNull(tile);
        Assert.assertSame(null, tile2);
        Assert.assertEquals(null, tile3);
    }

    @Test
    public void saveShouldReturnSuccesTest() {
        Tile tile = tileService.save(testTile);
        Assert.assertNotNull(tile);
    }


}
