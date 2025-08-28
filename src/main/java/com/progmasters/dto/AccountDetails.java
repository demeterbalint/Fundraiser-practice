package com.progmasters.dto;

import com.progmasters.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class AccountDetails {

    private Long id;
    private String username;
    private String goal;
    private Integer balance;
    private Integer funds;
    private List<TransferListItem> incomingTransfers;
    private List<TransferListItem> outgoingTransfers;

    public AccountDetails(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.goal = account.getGoal();
        this.balance = account.getBalance();
        this.funds = account.getFunds();
        this.incomingTransfers = account.getIncomingTransferList().stream().map(TransferListItem::new).toList();
        this.outgoingTransfers = account.getOutgoingTransferList().stream().map(TransferListItem::new).toList();
    }
}
