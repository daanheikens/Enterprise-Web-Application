package com.hva.nl.ewa.services.passwordReset;

import com.hva.nl.ewa.helpers.TokenFactory;
import com.hva.nl.ewa.models.PasswordResetToken;
import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    public PasswordResetTokenService(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public PasswordResetToken create(User user) {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(TokenFactory.createRandomUUID());
        passwordResetToken.setUser(user);
        return this.passwordResetTokenRepository.save(passwordResetToken);
    }

    public PasswordResetToken findOne(String token) {
        return this.passwordResetTokenRepository.findByToken(token).orElse(null);
    }

    public void delete(PasswordResetToken passwordResetToken) {
        this.passwordResetTokenRepository.deleteById(passwordResetToken.getId());
    }
}
