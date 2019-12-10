package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.Card;
import com.hva.nl.ewa.repositories.TreasureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreasureService {

    private final TreasureRepository repository;

    @Autowired
    public TreasureService(TreasureRepository repository) {
        this.repository = repository;
    }


    public Card save(Card treasureCard) {
        return this.repository.save(treasureCard);
    }

}
