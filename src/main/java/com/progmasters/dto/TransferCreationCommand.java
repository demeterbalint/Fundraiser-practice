package com.progmasters.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransferCreationCommand {

    private Long id;
    private String target;
    @Min(value = 50, message = "Amount too low")
    @Max(value = 1000, message = "Amount too high")
    private Integer amount;
    private String timeStamp;
}
