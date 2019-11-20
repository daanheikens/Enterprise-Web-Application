package com.hva.nl.ewa.helpers;

public enum Offset {
    X, Y;

    public static boolean isXOffset(Offset offset) {
        return X.equals(offset);
    }

    public static boolean isYOffset(Offset offset) {
        return Y.equals(offset);
    }
}
