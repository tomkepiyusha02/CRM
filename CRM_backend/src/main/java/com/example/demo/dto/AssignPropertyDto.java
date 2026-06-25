package com.example.demo.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class AssignPropertyDto {

    private UUID agentId;

    private UUID propertyId;
}