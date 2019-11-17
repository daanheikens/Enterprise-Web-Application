package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Tile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TileRepository extends JpaRepository<Tile, Long> {
    Tile findByTileId(long id);

    ArrayList<Tile> getAllByGameId(long gameId);
}
