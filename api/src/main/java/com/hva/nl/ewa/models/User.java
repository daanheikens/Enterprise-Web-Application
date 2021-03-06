package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;


@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements UserDetails, Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long userId;

    @Column
    @NotNull
    private String screenName;

    @Column
    @NotNull
    @JsonIgnore
    private String username;

    @Column
    @NotNull
    @JsonIgnore
    @Size(min = 5, max = 80, message = "{password.size}")
    private String password;

    @Column
    @NotNull
    @JsonIgnore
    private String email;

    @Column
    @NotNull
    private double latitude;

    @Column
    @NotNull
    private double longitude;

    @Column
    private String image;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private Set<Game> games = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Card> cards = new HashSet<>();

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private Pawn pawn;

    public User() {
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getUserId() {
        return userId;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void addGame(Game game) {
        this.games.add(game);
    }

    public Set<Game> getGames() {
        return games;
    }

    public Pawn getPawn() {
        return this.pawn;
    }

    public Set<Card> getCards() {
        return cards;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return this.password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.username;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    public void addCards(List<Card> cards) {

        for (Card card : cards) {
            card.setUser(this);
        }

        this.cards.addAll(cards);
    }
}
