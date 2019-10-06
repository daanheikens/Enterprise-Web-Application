package com.hva.nl.ewa.services.passwordReset;

import com.hva.nl.ewa.models.PasswordResetToken;
import com.hva.nl.ewa.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetMailService {

    private static final String EMAIL_SUBJECT = "Password reset requested";
    private static final String FROM_ADDRESS = "noreply@MagicalMaze.io";
    private static final String HOST_ADDRESS = "http://localhost:4200/reset-password";

    private final JavaMailSender javaMailSender;

    @Autowired
    public PasswordResetMailService(@Qualifier("getJavaMailSender") JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendPasswordResetMail(User user, PasswordResetToken passwordResetToken) {
        this.javaMailSender.send(this.createResetTokenUrl(passwordResetToken, user));
    }

    private SimpleMailMessage createResetTokenUrl(PasswordResetToken passwordResetToken, User user) {
        String url = HOST_ADDRESS + "?token=" + passwordResetToken.getToken();
        String message = "Password reset requested. Please click the link below";
        return this.createMail(message + " \r\n" + url, user);
    }

    private SimpleMailMessage createMail(String body, User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(EMAIL_SUBJECT);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(FROM_ADDRESS);
        return email;
    }
}
