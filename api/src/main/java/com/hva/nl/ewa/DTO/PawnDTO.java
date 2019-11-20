package com.hva.nl.ewa.DTO;

import com.hva.nl.ewa.models.PawnType;
import com.hva.nl.ewa.models.User;

public class PawnDTO {

    private long pawnId;

    private User user;

    private PawnType pawnType;

    public PawnDTO() {
    }

    public long getPawnId() {
        return pawnId;
    }

    public void setPawnId(long pawnId) {
        this.pawnId = pawnId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PawnType getPawnType() {
        return pawnType;
    }

    public void setPawnType(PawnType pawnType) {
        this.pawnType = pawnType;
    }
}
