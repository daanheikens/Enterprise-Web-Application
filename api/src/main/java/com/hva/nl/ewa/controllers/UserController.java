package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("#oauth2.hasAnyScope('player', 'admin')")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User findOne(@PathVariable Long id) {
        return userService.findOne(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public User update(@PathVariable long id, @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }
}
