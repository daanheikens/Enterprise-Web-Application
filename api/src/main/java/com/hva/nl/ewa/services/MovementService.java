package com.hva.nl.ewa.services;

import org.springframework.stereotype.Service;

@Service
public class MovementService {

    public MovementService() {

    }

    public boolean move(String direction) {
        /**
         * Steps:
         * 1. Validate direction in controller
         * 2. If valid fetch current user
         * 3. If user then call service method with user
         * 4. Get the game of the user with pawn
         * 5. get the tile of that pawn
         * 6. get the target tile by index
         * 7. validate if pawn can move from current tile to target tile
         * 8. if valid update the pawn with the target tile
         * 9. return true or false based on previous steps
         */

        return true;
    }
}
