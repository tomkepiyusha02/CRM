package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AssignPropertyDto;
import com.example.demo.entity.AgentProperty;
import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.repository.AgentPropertyRepository;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AgentPropertyServiceImpl
        implements AgentPropertyService {

    @Autowired
    private AgentPropertyRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    
    @Override
    public AgentProperty assignProperty(
            AssignPropertyDto dto) {

        Optional<AgentProperty> existing =
                repository.findByAgent_UserIdAndProperty_PropertyId(
                        dto.getAgentId(),
                        dto.getPropertyId());

        if(existing.isPresent()) {
            return existing.get();
        }

        if(repository.existsByProperty_PropertyId(dto.getPropertyId())) {
            throw new RuntimeException(
                    "Property already assigned to another agent.");
        }

        User agent =
                userRepository.findById(dto.getAgentId())
                        .orElseThrow(() ->
                                new RuntimeException("Agent Not Found"));

        Property property =
                propertyRepository.findById(dto.getPropertyId())
                        .orElseThrow(() ->
                                new RuntimeException("Property Not Found"));

        AgentProperty mapping = new AgentProperty();

        mapping.setAgent(agent);
        mapping.setProperty(property);

        return repository.save(mapping);
    }

    @Override
    public List<AgentProperty> getAssignedProperties(
            UUID agentId) {

        return repository.findByAgent_UserId(agentId);
    }

    @Override
    public List<Property> getPropertiesByAgent(
            UUID agentId) {

        return repository.findByAgent_UserId(agentId)
                .stream()
                .map(AgentProperty::getProperty)
                .collect(Collectors.toList());
    }

    @Override
    public void removeAssignment(UUID id) {

        repository.deleteById(id);
    }

    @Override
    public boolean isPropertyAssigned(
            UUID agentId,
            UUID propertyId) {

        return repository.existsByAgent_UserIdAndProperty_PropertyId(
                agentId,
                propertyId);
    }
}