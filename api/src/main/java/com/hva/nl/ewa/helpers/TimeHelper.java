package com.hva.nl.ewa.helpers;

import java.util.Date;

public class TimeHelper {

    public static boolean timeElapsed(Date date, int minutes) {
        if (minutes <= 0) {
            return false;
        }

        long diffMinutes = (new Date().getTime() - date.getTime()) / (1000 * 60);

        return diffMinutes >= minutes;
    }
}
