package com.hva.nl.ewa.repository;

import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.repositories.TileRepository;
import com.hva.nl.ewa.services.TileService;
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

/*
@author Sebastiaan van de Griendt
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class TileRepositoryTest {

    @Autowired
    @InjectMocks
    TileService tileService;

    @MockBean
    private TileRepository repository;

    int tileID = 10;
    int tileID1 = 0;

    @Before
    public void init(){
        Tile testTile = new Tile();
        Tile testTile1 = new Tile();
        Tile testTile2 = new Tile();
        testTile.setTileId(10);
        testTile1.setTileId(0);

        ArrayList<Tile> tiles = new ArrayList<>();
        tiles.add(testTile);
        tiles.add(testTile1);

        Mockito.when(repository.findByTileId(testTile.getTileId())).thenReturn(testTile);
        Mockito.when(repository.findByTileId(testTile1.getTileId())).thenReturn(testTile1);
        Mockito.when(repository.getAllByGameId(testTile.getTileId())).thenReturn(tiles);
    }

    @Test
    public void findByTileIdTest(){
        Tile tiles = repository.findByTileId(10);
        Tile tiles1 = repository.findByTileId(0);

        Assert.assertEquals(tileID, tiles.getTileId());
        Assert.assertEquals(tileID1, tiles1.getTileId());
    }

    @Test
    public void findAllByGameIdSizeTest(){
        int sizeArrayList = 2;
        ArrayList<Tile> tiles1 = repository.getAllByGameId(10);
        Assert.assertEquals(sizeArrayList, tiles1.size());
    }
}
