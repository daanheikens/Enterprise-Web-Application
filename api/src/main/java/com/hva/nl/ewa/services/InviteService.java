package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.Invite;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.InviteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InviteService {

    private final InviteRepository repository;

    @Autowired
    public InviteService(InviteRepository repository) {
        this.repository = repository;
    }

    public void inviteUsers(Game game, User inviter, List<User> invitees) {
        if (invitees.isEmpty()) {
            return;
        }

        List<Invite> invites = new ArrayList<>();

        for (User invitee : invitees) {
            Invite invite = new Invite();
            invite.setGame(game);
            invite.setInvitee(invitee);
            invite.setInviter(inviter);

            invites.add(invite);
        }

        this.repository.saveAll(invites);
    }

    public List<Invite> findInvites(User user) {
        return this.repository.findByInvitee(user);
    }

    public void removeInvite(Long inviteId) {
        this.repository.deleteById(inviteId);
    }
}
