package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.dto.SiteVisitRequestDto;
import com.example.demo.entity.SiteVisit;

public interface SiteVisitService {

	SiteVisit addSiteVisit(
	        SiteVisitRequestDto dto);

    List<SiteVisit> getAllSiteVisits();

    List<SiteVisit> getByAgent(
        UUID agentId
    );

    List<SiteVisit> getByLead(
        UUID leadId
    );

    SiteVisit updateSiteVisit(
        UUID id,
        SiteVisit siteVisit
    );

    void deleteSiteVisit(UUID id);
}
