package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.exceptions.StorageException;
import com.hva.nl.ewa.services.storage.StorageService;
import com.hva.nl.ewa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final UserService userService;

    private final StorageService storageService;

    @Autowired
    public RegisterController(UserService userService, StorageService storageService) {
        this.userService = userService;
        this.storageService = storageService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestParam("file") MultipartFile file) {
        String filePath = null;

        try {
            filePath = this.storageService.uploadFile(file);
        } catch (StorageException e) {
            // return 500 error
        }
    }
}
