package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.dto.FollowUpRequestDto;
import com.example.demo.entity.FollowUp;

public interface FollowUpService {

    FollowUp addFollowUp(
            FollowUpRequestDto dto);

    List<FollowUp> getAllFollowUps();

    List<FollowUp> getByAgent(
            UUID agentId);

    List<FollowUp> getByLead(
            UUID leadId);

    FollowUp updateFollowUp(
            UUID id,
            FollowUp followUp);

    void deleteFollowUp(
            UUID id);
}