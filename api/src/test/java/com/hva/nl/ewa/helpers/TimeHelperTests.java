package com.hva.nl.ewa.helpers;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

/**
 * @author Daan Heikens
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TimeHelperTests {

    @Test
    public void testTimeElapsedShouldReturnFalseWhenNegativeOr0MinutesProvided() {
        Assert.assertFalse(TimeHelper.timeElapsed(new Date(), -1));
        Assert.assertFalse(TimeHelper.timeElapsed(new Date(), 0));
    }

    @Test
    public void testTimeElapsedShouldReturnFalseWhenNotElapsed() {
        /* 2 minutes */
        int milliseconds = 2 * 60 * 1000;

        Date date = new Date(new Date().getTime() - milliseconds);
        Assert.assertFalse(TimeHelper.timeElapsed(date, 3));
    }

    @Test
    public void testTimeElapsedShouldReturnTrueWhenTimeHasElapsed() {
        /* 2 minutes */
        int milliseconds = 2 * 60 * 1000;
        /* 3 minutes */
        int milliseconds2 = 3 * 60 * 1000;

        Date date = new Date(new Date().getTime() - milliseconds);
        Date date2 = new Date(new Date().getTime() - milliseconds2);
        Assert.assertTrue(TimeHelper.timeElapsed(date, 2));
        Assert.assertTrue(TimeHelper.timeElapsed(date2, 3));
        Assert.assertTrue(TimeHelper.timeElapsed(date2, 2));
    }
}
