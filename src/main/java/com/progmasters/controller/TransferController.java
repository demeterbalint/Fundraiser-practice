package com.progmasters.controller;

import com.progmasters.dto.TransferListItem;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/transfers")
@Slf4j
public class TransferController {

    private TransferService transferService;
    //private TransferCreationCommandValidator tccv;

    @Autowired
    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping
    public ResponseEntity<List<TransferListItem>> getAllTransfers(HttpServletRequest request) {
        log.info("Getting all transfers");
        return ResponseEntity.ok(transferService.getAllTransfers());
    }
}
