package com.hva.nl.ewa.helpers;

import java.util.*;

public class CollectionHelper {

    public static <T> List<T> combine(T[] a, T[] b) {
        List<T> list = new ArrayList<T>(Arrays.asList(a));
        List<T> listB = new ArrayList<T>(Arrays.asList(b));
        list.addAll(listB);
        return list;
    }

    public static <T> Set<T> ToSet(T[] ar) {
        return new HashSet<>(Arrays.asList(ar));
    }

    public static <T> Set<T> toSet(T[][] twoDArray) {
        Set<T> set = new HashSet<>();
        for (T[] array : twoDArray) {
            set.addAll(Arrays.asList(array));
        }
        return set;
    }
}
