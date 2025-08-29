package com.progmasters.repository;

import com.progmasters.entity.Account;
import com.progmasters.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer,Long> {

    List<Transfer> findAllBySourceOrderByTimeStampDesc(Account source);
    List<Transfer> findAllByTargetOrderByTimeStampDesc(Account target);
    List<Transfer> findAllByOrderByTimeStampDesc();
}
