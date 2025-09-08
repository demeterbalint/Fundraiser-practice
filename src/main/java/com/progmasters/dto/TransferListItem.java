package com.progmasters.dto;

import com.progmasters.entity.Transfer;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
public class TransferListItem {

    private Long id;
    private String source;
    private String target;
    private Integer amount;
    private String timeStamp;

    public TransferListItem(Transfer transfer) {
        this.id = transfer.getId();
        this.source = transfer.getSource().getUsername();
        this.target = transfer.getTarget().getUsername();
        this.amount = transfer.getAmount();
        this.timeStamp = dateToString(transfer.getTimeStamp());
    }

    private String dateToString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = date.format(formatter);
        return formatted;
    }
}
