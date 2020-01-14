package com.hva.nl.ewa.models.turns;

public class TurnResult {
    private final TurnResultAction resultAction;

    public TurnResult(TurnResultAction resultAction) {
        this.resultAction = resultAction;
    }

    public TurnResultAction getResultAction() {
        return this.resultAction;
    }
}
