package com.hva.nl.ewa.repositories;

import com.hva.nl.ewa.models.Invite;
import com.hva.nl.ewa.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.List;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {
    List<Invite> findByInvitee(@NotNull User inviter);
}
