package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import com.example.demo.entity.enums.SiteVisitStatus;

import lombok.Data;

@Data
public class SiteVisitRequestDto {

    private UUID leadId;

    private UUID agentId;

    private UUID propertyId;   

    private LocalDate visitDate;

    private LocalTime visitTime;

    private String remarks;

    private String customerFeedback;

    private SiteVisitStatus status;
}