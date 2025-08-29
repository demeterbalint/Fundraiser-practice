package com.progmasters.service;

import com.progmasters.dto.AccountDetails;
import com.progmasters.dto.AccountRegistrationCommand;
import com.progmasters.entity.Account;
import com.progmasters.repository.AccountRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AccountService {

    private AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void registerAccount(AccountRegistrationCommand accountRegistrationCommand, String ipAddress) {
        if (isIpAddressAvailable(ipAddress)) {
            accountRepository.save(new Account(accountRegistrationCommand, ipAddress));
        } else {
            throw new EntityExistsException("Account with this ip address already exists");
        }
    }

    public boolean isIpAddressAvailable(String ipAddress) {
        return findByIpAddress(ipAddress) == null;
    }

    public AccountDetails getMyAccountDetails(String ipAddress) {
        Account account = findByIpAddress(ipAddress);
        return new AccountDetails(account);
    }

    public List<AccountDetails> getAllAccountDetails() {
        return accountRepository.findAll().stream().map(AccountDetails::new).toList();
    }

    private Account findByIpAddress(String ipAddress) {
        return accountRepository.findByIpAddress(ipAddress);
    }

    private Account findById(Long id) {
        if (accountRepository.findById(id).isPresent()) {
            return accountRepository.findById(id).get();
        }
        return null;
    }

    private List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Account findAccountByGoal(String target) {
        return accountRepository.findByGoal(target);
    }

    public Account findAccountByIp(String ipaddress) {
        return accountRepository.findByIpAddress(ipaddress);
    }
}
