package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.dto.AssignPropertyDto;
import com.example.demo.entity.AgentProperty;
import com.example.demo.entity.Property;

public interface AgentPropertyService {

    AgentProperty assignProperty(
            AssignPropertyDto dto);

    List<AgentProperty> getAssignedProperties(
            UUID agentId);

    List<Property> getPropertiesByAgent(
            UUID agentId);

    void removeAssignment(UUID id);

    boolean isPropertyAssigned(
            UUID agentId,
            UUID propertyId);
}