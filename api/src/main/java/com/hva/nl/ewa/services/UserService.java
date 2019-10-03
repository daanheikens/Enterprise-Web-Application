package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User loadUserByUsername(String s) {
        return this.userRepository.findByUsername(s);
    }

    public User findOne(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

    public User findOne(String email) {
        return this.userRepository.findByEmail(email).orElse(null);
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }
}
