package com.progmasters.controller;

import com.progmasters.dto.AccountDetails;
import com.progmasters.dto.AccountRegistrationCommand;
import com.progmasters.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/accounts")
@Slf4j
public class AccountController {

    private AccountService accountService;
    //private AccountRegistrationCommandValidator arcv;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<Void> registerNewAccount(HttpServletRequest request, @RequestBody AccountRegistrationCommand accountRegistrationCommand) {
        log.info("Registering new account");
        String ipAddress = request.getRemoteAddr();
        accountService.registerAccount(accountRegistrationCommand, ipAddress);
        log.info("New account has been saved");
        return ResponseEntity.created(URI.create("api/accounts/myAccountDetails")).build();
    }

    @GetMapping("/myAccountDetails")
    public ResponseEntity<AccountDetails> getAllAccountDetails(HttpServletRequest request) {
        log.info("Getting account details");
        String ipAddress = request.getRemoteAddr();
        return ResponseEntity.ok(accountService.getMyAccountDetails(ipAddress));
    }

    @GetMapping("/allAccounts")
    public ResponseEntity<List<AccountDetails>> getAllAccounts(HttpServletRequest request) {
        log.info("Getting all account details");
        return ResponseEntity.ok(accountService.getAllAccountDetails());
    }
}
