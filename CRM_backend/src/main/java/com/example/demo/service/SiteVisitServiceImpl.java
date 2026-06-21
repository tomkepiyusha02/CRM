package com.example.demo.service;



import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.SiteVisit;
import com.example.demo.repository.SiteVisitRepository;


@Service
public class SiteVisitServiceImpl
        implements SiteVisitService {

    @Autowired
    private SiteVisitRepository repository;

    @Override
    public SiteVisit addSiteVisit(
            SiteVisit siteVisit) {

        return repository.save(
                siteVisit);
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
