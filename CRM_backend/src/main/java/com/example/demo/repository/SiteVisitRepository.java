package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SiteVisit;
import com.example.demo.entity.enums.SiteVisitStatus;

@Repository
public interface SiteVisitRepository
extends JpaRepository<SiteVisit, UUID> {

    List<SiteVisit> findByAgent_UserId(UUID agentId);

    List<SiteVisit> findByLead_Leadid(UUID leadId);
    
    List<SiteVisit> findByStatus(
            SiteVisitStatus status);

}
