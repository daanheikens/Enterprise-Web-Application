package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public List listUser() {
        return userService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User create(@RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User findOne(@PathVariable long id) {
        return userService.findOne(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public User update(@PathVariable long id, @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }
}
