package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.entity.Property;

public interface PropertyService {

    Property addProperty(Property property);

    Property updateProperty(
            UUID id,
            Property property);

    String deleteProperty(UUID id);

    Property getPropertyById(UUID id);

    Property getPropertyByName(String name);

    List<Property> getAllProperties();

    List<Property> getPropertiesByLocation(
            String location);

    List<Property> getPropertiesByType(
            String type);

    List<Property> getPropertiesByStatus(
            String status);

    List<Property> getPropertiesByBuilder(
            String builderName);
    
    List<Property> getAssignedProperties(UUID agentId);
}

