package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.DTO.GameDTO;
import com.hva.nl.ewa.DTO.InviteDTO;
import com.hva.nl.ewa.helpers.modelmappers.DefaultModelMapper;
import com.hva.nl.ewa.models.Game;
import com.hva.nl.ewa.models.Invite;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.InviteService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/api/invites", produces = MediaType.APPLICATION_JSON_VALUE)
public class InviteController {
    private final InviteService inviteService;
    private final UserService userService;
    private final DefaultModelMapper modelMapper;

    @Autowired
    public InviteController(InviteService inviteService, UserService userService, DefaultModelMapper modelMapper) {
        this.inviteService = inviteService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<InviteDTO>> find(OAuth2Authentication auth) {
        User user = this.userService.loadUserByUsername(auth.getName());
        if (user == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
        }

        List<InviteDTO> inviteDTOs = new ArrayList<>();
        List<Invite> invites = this.inviteService.findInvites(user);

        for (Invite invite : invites) {
            InviteDTO inviteDTO = new InviteDTO();
            inviteDTO.setInviteId(invite.getInviteId());
            inviteDTO.setInviterName(invite.getInviter().getScreenName());
            Game game = invite.getGame();
            GameDTO gameDTO = this.modelMapper.ModelToDTO(game, GameDTO.class);
            gameDTO.setCurrentPlayers(game.getUsers());
            gameDTO.setMaxPlayers(game.getMaxPlayers());
            inviteDTO.setGame(gameDTO);
            inviteDTOs.add(inviteDTO);
        }

        return new ResponseEntity<>(inviteDTOs, new HttpHeaders(), HttpStatus.OK);
    }
}
