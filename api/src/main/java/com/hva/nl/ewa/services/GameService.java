package com.hva.nl.ewa.services;

import com.hva.nl.ewa.helpers.TimeHelper;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> find(User user) {
        return this.gameRepository.findAllByInitiatorNotAndPrivateGameIsFalse(user);
    }

    public Game findOne(Long id) {
        return this.gameRepository.findById(id).orElse(null);
    }

    public Game save(Game game) {
        return this.gameRepository.save(game);
    }

    public void delete(Game game) {
        this.gameRepository.delete(game);
    }

    public Game getCurrentGame(User user) {
        Game currentGame = null;
        for (Game game : user.getGames()) {
            if (game == null) {
                continue;
            }

            if (game.getUsers().size() < game.getMaxPlayers() && TimeHelper.timeElapsed(game.getCreationDate(), game.getMaxPendingTime())) {
                this.delete(game);
                continue;
            }
            currentGame = game;
            break;
        }

        return currentGame;
    }
}
