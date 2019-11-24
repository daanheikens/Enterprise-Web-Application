package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Tile;
import com.hva.nl.ewa.models.TreasureCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface TreasureRepository extends JpaRepository<TreasureCard, Long> {

    TreasureCard findByTreasureID(long id);

    ArrayList<TreasureCard> getAllByTreasureID(long treasureID);
}
