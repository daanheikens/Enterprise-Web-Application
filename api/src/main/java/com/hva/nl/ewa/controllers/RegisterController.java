package com.hva.nl.ewa.controllers;

import com.byteowls.jopencage.model.JOpenCageLatLng;
import com.hva.nl.ewa.exceptions.StorageException;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.GeocodingService;
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

    private final GeocodingService geocodingService;

    @Autowired
    public RegisterController(UserService userService,
                              StorageService storageService,
                              GeocodingService geocodingService,
                              PasswordEncoder encoder
    ) {
        this.userService = userService;
        this.storageService = storageService;
        this.geocodingService = geocodingService;
        this.encoder = encoder;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> create(@RequestParam("screenName") String screenName,
                                       @RequestParam("username") String username,
                                       @RequestParam("password") String password,
                                       @RequestParam("email") String email,
                                       @RequestParam("street") String street,
                                       @RequestParam("number") String number,
                                       @RequestParam("city") String city,
                                       @RequestParam("file") MultipartFile file
    ) throws StorageException {
        User user = new User();
        user.setScreenName(screenName);
        user.setUsername(username);
        user.setPassword(this.encoder.encode(password));
        user.setEmail(email);
        JOpenCageLatLng coordinates = this.geocodingService.addressToCoordinates(street, number, city);
        user.setLatitude(coordinates.getLat());
        user.setLongitude(coordinates.getLng());
        user.setImage(this.storageService.uploadFile(file));
        return new ResponseEntity<>(this.userService.save(user), new HttpHeaders(), HttpStatus.CREATED);
    }
}
