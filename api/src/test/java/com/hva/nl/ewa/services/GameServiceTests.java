package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.GameRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.collection.IsEmptyCollection.empty;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNot.not;
import static org.hamcrest.core.IsNull.nullValue;
import static org.mockito.Mockito.*;

/**
 * @author Lars Bruins Slot
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class GameServiceTests {

    private GameRepository gameRepository;
    private GameService gameService;

    @Before
    public void Before(){
        gameRepository = mock(GameRepository.class);
        gameService = new GameService(gameRepository);
    }

    @Test
    public void constructorWithoutRepository(){
        //create with invalid constructor
        Assertions.assertThatThrownBy( () -> new GameService(null))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    public void findwithuser(){
        //create user and gamelist
        var user = new User();
        var gameList = new ArrayList<Game>();
        gameList.add(new Game());

        //setup mockito return
        when(gameRepository.findAllByInitiatorNotAndPrivateGameIsFalse(user)).thenReturn(gameList);

        //execute
        var returned = gameService.find(user);

        //expect correct repository function called
        assertThat(returned, not(empty()));
        assertThat(returned, not(nullValue()));
        assertThat(returned, is(gameList));
        verify(gameRepository).findAllByInitiatorNotAndPrivateGameIsFalse(user);
    }

    @Test
    public void findOne(){
        //create user and gamelist
        long id = 5L;
        var game = Optional.of(new Game());

        //setup mockito return
        when(gameRepository.findById(id)).thenReturn(game);

        //execute
        var returned = gameService.findOne(id);

        //expect correct repository function called
        assertThat(returned, not(nullValue()));
        assertThat(returned, is(game.get()));
    }

    @Test
    public void save(){
        //create user and gamelist
        long id = 5L;
        var game = new Game();

        //setup mockito return
        when(gameRepository.save(game)).thenReturn(game);

        //execute
        var returned = gameService.save(game);

        //expect correct repository function called
        assertThat(returned, not(nullValue()));
        assertThat(returned, is(game));
    }

    @Test
    public void delete(){
        //create user and gamelist
        var game = new Game();

        //execute
        gameService.delete(game);

        //expect correct repository function called
        verify(gameRepository).delete(game);
    }

    @Test
    public void getCurrentGame(){
        //create user and game
        long id = 5L;
        var user = mock(User.class);
        var game = new Game();
        var games = new ArrayList<Game>();
        games.add(game);

        //setup mockito return
        when(user.getGames()).thenReturn(new HashSet<>(games));

        //execute
        var returned = gameService.getCurrentGame(user);

        //expect correct repository function called
        assertThat(returned, not(nullValue()));
        assertThat(returned, is(game));
    }

}
