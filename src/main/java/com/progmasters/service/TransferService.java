package com.progmasters.service;

import com.progmasters.dto.TransferListItem;
import com.progmasters.repository.TransferRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TransferService {

    private TransferRepository transferRepository;
    private AccountService accountService;

    public TransferService(TransferRepository transferRepository) {
        this.transferRepository = transferRepository;
    }

    public List<TransferListItem> getAllTransfers() {
        return transferRepository.findAllByOrderByTimeStampDesc().stream().map(TransferListItem::new).toList();
    }
}
