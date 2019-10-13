package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
