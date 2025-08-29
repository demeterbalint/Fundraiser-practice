package com.progmasters.service;

import com.progmasters.dto.AccountDetails;
import com.progmasters.dto.TargetAccountOption;
import com.progmasters.dto.TransferInitData;
import com.progmasters.dto.TransferListItem;
import com.progmasters.repository.TransferRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
}
