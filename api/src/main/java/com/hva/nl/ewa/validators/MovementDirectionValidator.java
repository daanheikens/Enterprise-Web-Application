package com.hva.nl.ewa.validators;

public class MovementDirectionValidator {

    private static final String MOVEMENT_UP = "ArrowUp";
    private static final String MOVEMENT_DOWN = "ArrowDown";
    private static final String MOVEMENT_LEFT = "ArrowLeft";
    private static final String MOVEMENT_RIGHT = "ArrowRight";

    public static boolean isValidMovementDirection(String direction) {
        return direction.equals(MOVEMENT_UP) || direction.equals(MOVEMENT_DOWN) || direction.equals(MOVEMENT_LEFT) || direction.equals(MOVEMENT_RIGHT);
    }
}
