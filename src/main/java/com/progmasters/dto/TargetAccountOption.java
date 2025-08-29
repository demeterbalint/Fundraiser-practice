package com.progmasters.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TargetAccountOption {

    private Long id;
    private String goal;

    public TargetAccountOption(AccountDetails accountDetails) {
        this.id = accountDetails.getId();
        this.goal = accountDetails.getGoal();
    }
}
