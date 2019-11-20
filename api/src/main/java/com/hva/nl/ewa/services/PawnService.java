package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.*;
import com.hva.nl.ewa.repositories.PawnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PawnService {

    private final PawnRepository repository;

    @Autowired
    public PawnService(PawnRepository repository) {
        this.repository = repository;
    }

    public Pawn save(Pawn pawn) {
        return this.repository.save(pawn);
    }

    public Pawn create(User user, Game game, Tile tile, PawnType type) {
        Pawn pawn = new Pawn();

        pawn.setUser(user);
        pawn.setGame(game);
        pawn.setPawnType(type);
        pawn.setTile(tile);

        return this.save(pawn);
    }
}
