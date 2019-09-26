package com.hva.nl.ewa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String username;
    @Column
    @JsonIgnore
    private String password;
    @Column
    private String email;
    @Column
    private String image;
}
