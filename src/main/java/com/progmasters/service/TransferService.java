package com.progmasters.service;

import com.progmasters.dto.*;
import com.progmasters.entity.Account;
import com.progmasters.entity.Transfer;
import com.progmasters.repository.TransferRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TransferService {

    private TransferRepository transferRepository;
    private AccountService accountService;

    public TransferService(TransferRepository transferRepository, AccountService accountService) {
        this.transferRepository = transferRepository;
        this.accountService = accountService;
    }

    public List<TransferListItem> getAllTransfers() {
        return transferRepository.findAllByOrderByTimeStampDesc().stream().map(TransferListItem::new).toList();
    }

    public TransferInitData getTransferInitData(String ipaddress) {
        TransferInitData transferInitData = new TransferInitData();

        AccountDetails source = accountService.getMyAccountDetails(ipaddress);

        List<TargetAccountOption> targetAccountOptions = new ArrayList<>(accountService.getAllAccountDetails().stream().map(TargetAccountOption::new).toList());
        targetAccountOptions.removeIf(t -> t.getId().equals(source.getId()));
        transferInitData.setTargetAccountOptions(targetAccountOptions);
        transferInitData.setSourceAccountName(source.getUsername());
        transferInitData.setBalance(source.getBalance());
        return transferInitData;
    }

    public void saveTransfer(TransferCreationCommand transferCreationCommand, String ipaddress) {
        Account source = accountService.findAccountByIp(ipaddress);
        if (transferCreationCommand.getAmount() > source.getBalance()) {
            throw new IllegalArgumentException("The transfer amount exceeds the balance");
        }

        Account target = accountService.findAccountByGoal(transferCreationCommand.getTarget());

        Transfer transfer = new Transfer();
        transfer.setSource(source);
        transfer.setTarget(target);
        transfer.setAmount(transferCreationCommand.getAmount());

        source.setBalance(source.getBalance() - transferCreationCommand.getAmount());
        target.setFunds(target.getFunds() + transferCreationCommand.getAmount());
        transferRepository.save(transfer);
    }
}
