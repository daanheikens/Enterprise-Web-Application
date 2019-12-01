package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findGamesByInitiatorNot(User user);
}
