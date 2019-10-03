package com.hva.nl.ewa.helpers;

import java.util.UUID;

/**
 * Class is used to generate tokens. Useful to generate unique ids, numbers or tokens to be used by system
 */
public class TokenFactory {

    public static String createRandomUUID()
    {
        return UUID.randomUUID().toString();
    }
}
