package com.progmasters.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name = "transfer")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_account_id")
    private Account source;

    @ManyToOne
    @JoinColumn(name = "target_account_id")
    private Account target;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "time_stamp", updatable = false)
    @CreationTimestamp
    private LocalDateTime timeStamp;
}
