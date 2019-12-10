package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface TreasureRepository extends JpaRepository<Card, Long> {

    Card findByid(long id);

    ArrayList<Card> getAllByGame(long id);
}
