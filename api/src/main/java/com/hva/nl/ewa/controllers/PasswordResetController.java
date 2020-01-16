package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.models.PasswordResetToken;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.services.UserService;
import com.hva.nl.ewa.services.passwordReset.PasswordResetMailService;
import com.hva.nl.ewa.services.passwordReset.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping(value = "/reset-password", produces = MediaType.APPLICATION_JSON_VALUE)
public class PasswordResetController {

    private final PasswordResetMailService passwordResetMailService;

    private final UserService userService;

    private final PasswordResetTokenService passwordResetTokenService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordResetController(PasswordResetMailService passwordResetMailService,
                                   UserService userService,
                                   PasswordResetTokenService passwordResetTokenService,
                                   PasswordEncoder passwordEncoder
    ) {
        this.passwordResetMailService = passwordResetMailService;
        this.userService = userService;
        this.passwordResetTokenService = passwordResetTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity requestResetPasswordToken(@RequestParam("email") String email) {
        User user = this.userService.findOne(email);

        if (user != null) {
            PasswordResetToken passwordResetToken = this.passwordResetTokenService.create(user);
            this.passwordResetMailService.sendPasswordResetMail(user, passwordResetToken);
        }

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{token}", method = RequestMethod.POST)
    public ResponseEntity resetPassword(@PathVariable("token") String token, @RequestParam("newPassword") String newPassword) {
        PasswordResetToken passwordResetToken = this.passwordResetTokenService.findOne(token);

        if (passwordResetToken == null) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        User user = passwordResetToken.getUser();
        user.setPassword(this.passwordEncoder.encode(newPassword));
        this.userService.save(user);
        this.passwordResetTokenService.delete(passwordResetToken);

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }
}
