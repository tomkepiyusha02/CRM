package com.example.demo.service;



import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SiteVisitRequestDto;
import com.example.demo.entity.Lead;
import com.example.demo.entity.Property;
import com.example.demo.entity.SiteVisit;
import com.example.demo.entity.User;
import com.example.demo.repository.LeadRepository;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.SiteVisitRepository;
import com.example.demo.repository.UserRepository;


@Service
public class SiteVisitServiceImpl
        implements SiteVisitService {

    @Autowired
    private SiteVisitRepository repository;
    
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public SiteVisit addSiteVisit(
            SiteVisitRequestDto dto) {

        Lead lead =
                leadRepository.findById(
                        dto.getLeadId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Lead Not Found"));

        User agent =
                userRepository.findById(
                        dto.getAgentId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Agent Not Found"));

        Property property =
                propertyRepository.findById(
                        dto.getPropertyId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Property Not Found"));

        SiteVisit visit =
                new SiteVisit();

        visit.setLead(lead);

        visit.setAgent(agent);

        visit.setProperty(property);

        visit.setVisitDate(
                dto.getVisitDate());

        visit.setVisitTime(
                dto.getVisitTime());

        visit.setRemarks(
                dto.getRemarks());

        visit.setCustomerFeedback(
                dto.getCustomerFeedback());

        visit.setStatus(
                dto.getStatus());

        return repository.save(
                visit);
    }

    @Override
    public List<SiteVisit> getAllSiteVisits() {

        return repository.findAll();
    }

    @Override
    public List<SiteVisit> getByAgent(
            UUID agentId) {

        return repository
                .findByAgent_UserId(
                        agentId);
    }

    @Override
    public List<SiteVisit> getByLead(
            UUID leadId) {

        return repository
                .findByLead_Leadid(
                        leadId);
    }

    @Override
    public SiteVisit updateSiteVisit(
            UUID id,
            SiteVisit siteVisit) {

        SiteVisit existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setVisitDate(
                siteVisit.getVisitDate());

        existing.setVisitTime(
                siteVisit.getVisitTime());

        existing.setCustomerFeedback(
                siteVisit.getCustomerFeedback());

        existing.setRemarks(
                siteVisit.getRemarks());

        existing.setStatus(
                siteVisit.getStatus());

        return repository.save(
                existing);
    }

    @Override
    public void deleteSiteVisit(
            UUID id) {

        repository.deleteById(id);
    }
}
