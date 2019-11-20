package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Pawn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PawnRepository extends JpaRepository<Pawn, Long> {
}
