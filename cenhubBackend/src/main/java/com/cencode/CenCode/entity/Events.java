package com.cencode.CenCode.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String url;
    @Column(nullable = false)
    private Date startDate;
//    @Column(nullable = false)
//    private Date endDate;
    @Column(nullable = false)
    private String eventCategory; // WeeklyTests, MonthlyTests, OtherEvents
    @Column(nullable = false)
    private String status;
}
