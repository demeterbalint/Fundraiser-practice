package com.progmasters.controller;

import com.progmasters.dto.TransferCreationCommand;
import com.progmasters.dto.TransferInitData;
import com.progmasters.dto.TransferListItem;
import com.progmasters.service.TransferService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/transfers")
@Slf4j
public class TransferController {

    private TransferService transferService;

    @Autowired
    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping("/allTransfers")
    public ResponseEntity<List<TransferListItem>> getAllTransfers() {
        log.info("Getting all transfers");
        return ResponseEntity.ok(transferService.getAllTransfers());
    }

    @GetMapping
    public ResponseEntity<TransferInitData> getNewTransferData(HttpServletRequest request) {
        log.info("Getting new transfer data");
        String ipaddress = request.getRemoteAddr();
        return ResponseEntity.ok(transferService.getTransferInitData(ipaddress));
    }

    @PostMapping
    public ResponseEntity<Void> saveTransfer(HttpServletRequest request, @RequestBody @Valid TransferCreationCommand  transferCreationCommand) {
        log.info("Saving transfer data");
        String ip =  request.getRemoteAddr();
        transferService.saveTransfer(transferCreationCommand, ip);
        log.info("New transfer has been saved");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
