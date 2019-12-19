package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.repositories.TileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TileService {

    private final TileRepository repository;

    @Autowired
    public TileService(TileRepository repository) {
        this.repository = repository;
    }

    public Tile findOne(long id) {
        return this.repository.findById(id).orElse(null);
    }

    public Tile save(Tile tile) {
        return this.repository.save(tile);
    }
}
