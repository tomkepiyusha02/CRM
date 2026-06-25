package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.AgentProperty;

public interface AgentPropertyRepository
        extends JpaRepository<AgentProperty, UUID>{

    List<AgentProperty> findByAgent_UserId(UUID agentId);

    boolean existsByAgent_UserIdAndProperty_PropertyId(
            UUID agentId,
            UUID propertyId
    );

    Optional<AgentProperty> findByAgent_UserIdAndProperty_PropertyId(
            UUID agentId,
            UUID propertyId
    );
    
    boolean existsByProperty_PropertyId(UUID propertyId);
    
   
}