package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Card;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    Card findFirstByUserAndGame(User user, Game game);
}
