package com.hva.nl.ewa.helpers;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class CollectionHelper {

    public static <T> List<T> combine(T[] a, T[] b) {
        List<T> list = new ArrayList<T>(Arrays.asList(a));
        List<T> listB = new ArrayList<T>(Arrays.asList(b));
        list.addAll(listB);
        return list;
    }

    public static <T> List<T> shuffle(List<T> ar) {
        // If running on Java 6 or older, use `new Random()` on RHS here
        Random rnd = ThreadLocalRandom.current();
        for (int i = ar.size() - 1; i > 0; i--) {
            int index = rnd.nextInt(i + 1);
            // Simple swap
            T a = ar.get(index);
            ar.set(index, ar.get(i));
            ar.set(i, a);
        }
        return ar;
    }

    public static <T> Set<T> ToSet(T[] ar) {
        return new HashSet<>(Arrays.asList(ar));
    }
}
