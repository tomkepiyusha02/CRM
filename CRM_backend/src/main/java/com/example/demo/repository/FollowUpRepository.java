
package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.FollowUp;
import com.example.demo.entity.enums.FollowUpStatus;

@Repository
public interface FollowUpRepository
extends JpaRepository<FollowUp, UUID> {

    List<FollowUp> findByAgent_UserId(UUID agentId);

    List<FollowUp> findByLead_Leadid(UUID leadId);
    
    List<FollowUp> findByStatus(
            FollowUpStatus status);

}