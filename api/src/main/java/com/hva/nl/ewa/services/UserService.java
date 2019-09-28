package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(s);
    }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User findOne(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }

    public void deleteById(Long id) {
        this.userRepository.deleteById(id);
    }
}
