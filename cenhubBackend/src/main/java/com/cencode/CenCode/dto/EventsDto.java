package com.cencode.CenCode.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class EventsDto {
    private Long id;
    private String name;
    private String url;
    private Date startDate;
//    private Date endDate;
    private String eventCategory; // WeeklyTests, MonthlyTests, OtherEvents
    private String status;
}
