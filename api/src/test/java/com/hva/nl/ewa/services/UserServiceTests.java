package com.hva.nl.ewa.services;

import com.hva.nl.ewa.models.User;
import com.hva.nl.ewa.repositories.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTests {

    @MockBean
    UserRepository userRepository;

    @Autowired
    @InjectMocks
    UserService userService;

    User testUser;

    User testUser2;

    List<User> users = new ArrayList<>();

    List<User> users2 = new ArrayList<>();

    @Before
    public void setUp() {
        testUser = new User();
        testUser2 = new User();
        testUser.setUserId(200);
        testUser2.setUserId(300);
        testUser.setEmail("UT@UT.UT");
        testUser.setUsername("Joost");

        users.add(testUser);
        users.add(testUser2);
        users2.add(testUser2);

        Mockito.when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));
        Mockito.when(userRepository.findByUsername(testUser.getUsername())).thenReturn(testUser);
        Mockito.when(userRepository.findAllByUserIdNot(-1)).thenReturn(users);
        Mockito.when(userRepository.findAllByUserIdNot(testUser.getUserId())).thenReturn(users2);
    }

    @Test
    public void testFindByUsernameReturnsUser() {
        User user = userService.loadUserByUsername("Joost");
        Assert.assertEquals(testUser, user);
    }

    @Test
    public void testFindByEmailShouldReturnUser() {
        User user = userService.findOne("UT@UT.UT");
        Assert.assertEquals(testUser, user);
    }

    @Test
    public void testFindByUserIdNotReturnsOtherUser() {
        List<User> users = userService.find(200);
        Assert.assertEquals(1, users.size());
        Assert.assertEquals(users.get(0), testUser2);
    }

    @Test
    public void testFindByUserIdNotShouldReturnAllUsers() {
        List<User> users = userService.find(-1);
        Assert.assertEquals(2, users.size());
        Assert.assertEquals(users.get(0), testUser);
        Assert.assertEquals(users.get(1), testUser2);
    }
}
