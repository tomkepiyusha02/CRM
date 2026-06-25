package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import com.example.demo.entity.enums.FollowUpStatus;
import com.example.demo.entity.enums.ReminderType;

import lombok.Data;

@Data
public class FollowUpRequestDto {

    private UUID leadId;

    private UUID agentId;

    private LocalDate followupDate;

    private LocalTime followupTime;

    private String notes;

    private FollowUpStatus status;

    private ReminderType reminderType;

}