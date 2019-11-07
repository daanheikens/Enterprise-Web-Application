package com.hva.nl.ewa.controllers;

import com.hva.nl.ewa.services.MovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping(value = "/api/movement", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovementController {

    private final MovementService movementService;

    @Autowired
    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Boolean> move(@RequestParam(name = "direction") String direction) {
        return new ResponseEntity<>(true, new HttpHeaders(), HttpStatus.OK);
    }
}
