package com.example.demo.service;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.FollowUpRequestDto;
import com.example.demo.entity.FollowUp;
import com.example.demo.entity.Lead;
import com.example.demo.entity.User;
import com.example.demo.repository.FollowUpRepository;
import com.example.demo.repository.LeadRepository;
import com.example.demo.repository.UserRepository;


@Service
public class FollowUpServiceImpl
        implements FollowUpService {

    @Autowired
    private FollowUpRepository repository;
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public FollowUp addFollowUp(
            FollowUpRequestDto dto) {

        Lead lead =
                leadRepository.findById(
                        dto.getLeadId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Lead Not Found"));

        User agent =
                userRepository.findById(
                        dto.getAgentId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Agent Not Found"));

        FollowUp followUp =
                new FollowUp();

        followUp.setLead(
                lead);

        followUp.setAgent(
                agent);

        followUp.setFollowupDate(
                dto.getFollowupDate());

        followUp.setFollowupTime(
                dto.getFollowupTime());

        followUp.setNotes(
                dto.getNotes());

        followUp.setStatus(
                dto.getStatus());

        followUp.setReminderType(
                dto.getReminderType());

        return repository.save(
                followUp);
    }

    @Override
    public List<FollowUp> getAllFollowUps() {

        return repository.findAll();
    }

    @Override
    public List<FollowUp> getByAgent(
            UUID agentId) {

        return repository
                .findByAgent_UserId(
                        agentId);
    }

    @Override
    public List<FollowUp> getByLead(
            UUID leadId) {

        return repository
                .findByLead_Leadid(
                        leadId);
    }

    @Override
    public FollowUp updateFollowUp(
            UUID id,
            FollowUp followUp) {

        FollowUp existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setFollowupDate(
                followUp.getFollowupDate());

        existing.setFollowupTime(
                followUp.getFollowupTime());

        existing.setNotes(
                followUp.getNotes());

        existing.setStatus(
                followUp.getStatus());

        existing.setReminderType(
                followUp.getReminderType());

        return repository.save(
                existing);
    }

    @Override
    public void deleteFollowUp(
            UUID id) {

        repository.deleteById(id);
    }
}
