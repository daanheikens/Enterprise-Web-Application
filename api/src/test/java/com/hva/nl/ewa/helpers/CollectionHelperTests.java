package com.hva.nl.ewa.helpers;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CollectionHelperTests {

    @Test
    public void testCombine() {
        // Create two arrays of T
        Integer[] arr1 = new Integer[1];
        Integer[] arr2 = new Integer[1];
        arr1[0] = 20;
        arr2[0] = 30;

        // Call method
        List<Integer> list = CollectionHelper.combine(arr1, arr2);
        List<Integer> expectedList = Arrays.asList(20, 30);
        Assert.assertEquals(2, list.size());

        Assert.assertThat(list, is(expectedList));

        Integer[] arr3 = new Integer[1];
        Integer[] arr4 = new Integer[1];

        List<Integer> list2 = CollectionHelper.combine(arr3, arr4);

        Assert.assertEquals(2, list2.size());

        for (Integer i : list2) {
            Assert.assertNull(i);
        }
    }

    @Test
    public void testToSet() {
        // Create array
        Integer[] arr1 = new Integer[1];
        Integer[][] arr2 = new Integer[1][1];
        arr1[0] = 20;
        arr2[0][0] = 30;

        Set<Integer> expectedSet1 = new HashSet<>();
        expectedSet1.add(20);
        Set<Integer> expectedSet2 = new HashSet<>();
        expectedSet2.add(30);
        Set<Integer> set1 = CollectionHelper.ToSet(arr1);
        Set<Integer> set2 = CollectionHelper.toSet(arr2);

        Assert.assertThat(set1, is(expectedSet1));
        Assert.assertThat(set2, is(expectedSet2));
    }
}
