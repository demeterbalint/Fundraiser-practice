package com.progmasters.entity;

import com.progmasters.dto.AccountRegistrationCommand;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;

    @Column(name = "user_name")
    private String username;

    @Column(name = "goal")
    private String goal;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "balance")
    private Integer balance;

    @Column(name = "funds")
    private Integer funds;

    @Column(name = "incoming_transfer_list")
    @OneToMany(mappedBy = "target")
    private List<Transfer> incomingTransferList;

    @Column(name = "outgoing_transfer_list")
    @OneToMany(mappedBy = "source")
    private List<Transfer> outgoingTransferList;

    public Account(AccountRegistrationCommand accountRegistrationCommand, String ipAddress) {
        this.username = accountRegistrationCommand.getUsername();
        this.goal = accountRegistrationCommand.getGoal();
        this.ipAddress = ipAddress;
        this.balance = 5000;
        this.funds = 0;
        this.incomingTransferList = new ArrayList<>();
        this.outgoingTransferList = new ArrayList<>();
    }
}
