package com.progmasters.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransferCreationCommand {

    private Long id;
    private String target;
    private Integer amount;
    private String timeStamp;
}
