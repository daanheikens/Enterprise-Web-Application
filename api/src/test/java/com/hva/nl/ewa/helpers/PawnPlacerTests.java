package com.hva.nl.ewa.helpers;

import com.hva.nl.ewa.exceptions.PawnPlacerException;
import com.hva.nl.ewa.models.BoardResult;
import com.hva.nl.ewa.models.Pawn;
import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.services.BoardService;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;

import static org.mockito.Mockito.mock;

/**
 * @author Daan Heikens
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class PawnPlacerTests {

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Autowired
    private BoardService boardService;

    @Test
    public void testPawnPlacerShouldPlacePawn() throws PawnPlacerException {
        Pawn pawn = mock(Pawn.class);
        Pawn pawn1 = mock(Pawn.class);
        Pawn pawn2 = mock(Pawn.class);
        Pawn pawn3 = mock(Pawn.class);
        BoardResult board = boardService.CreateBoard();
        Set<Tile> tiles = CollectionHelper.toSet(board.getTiles());
        PawnPlacer.placePawnOnInitialTile(pawn, tiles, 1);
        PawnPlacer.placePawnOnInitialTile(pawn1, tiles, 2);
        PawnPlacer.placePawnOnInitialTile(pawn2, tiles, 3);
        PawnPlacer.placePawnOnInitialTile(pawn3, tiles, 4);

        // Assert on each tile that a pawn is placed
        Assert.assertEquals(board.getTiles()[0][0].getPawn(), pawn);
        Assert.assertEquals(board.getTiles()[6][0].getPawn(), pawn1);
        Assert.assertEquals(board.getTiles()[0][6].getPawn(), pawn2);
        Assert.assertEquals(board.getTiles()[6][6].getPawn(), pawn3);
    }

    @Test
    public void testPawnPlaceShouldThrowException() {
        Pawn pawn = mock(Pawn.class);
        BoardResult board = boardService.CreateBoard();
        Set<Tile> tiles = CollectionHelper.toSet(board.getTiles());
        Assertions.assertThatThrownBy(() -> PawnPlacer.placePawnOnInitialTile(pawn, tiles, 0))
                .isInstanceOf(PawnPlacerException.class);
        Assertions.assertThatThrownBy(() -> PawnPlacer.placePawnOnInitialTile(pawn, tiles, -1))
                .isInstanceOf(PawnPlacerException.class);
        Assertions.assertThatThrownBy(() -> PawnPlacer.placePawnOnInitialTile(pawn, tiles, 5))
                .isInstanceOf(PawnPlacerException.class);
    }
}
