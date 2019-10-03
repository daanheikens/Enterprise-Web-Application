package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.exceptions.StorageException;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.storage.StorageService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
public class RegisterController {

    private final UserService userService;

    private final StorageService storageService;

    private final PasswordEncoder encoder;

    @Autowired
    public RegisterController(UserService userService,
                              StorageService storageService,
                              PasswordEncoder encoder
    ) {
        this.userService = userService;
        this.storageService = storageService;
        this.encoder = encoder;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> create(@RequestParam("screenName") String screenName,
                                       @RequestParam("username") String username,
                                       @RequestParam("password") String password,
                                       @RequestParam("email") String email,
                                       @RequestParam("file") MultipartFile file) throws StorageException {

        User user = new User();
        user.setScreenName(screenName);
        user.setUsername(username);
        user.setPassword(this.encoder.encode(password));
        user.setEmail(email);
        user.setImage(this.storageService.uploadFile(file));
        // We must do this to omit the password
        user = this.userService.save(user);
        return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.CREATED);
    }
}
