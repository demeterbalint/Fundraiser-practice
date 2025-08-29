package com.progmasters.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class TransferInitData {

    private String sourceAccountName;
    private List<TargetAccountOption> targetAccountOptions;
    private Integer balance;
}
