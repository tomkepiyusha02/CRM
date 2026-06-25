package com.example.demo.service;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.entity.AgentProperty;
import com.example.demo.entity.Property;
import com.example.demo.entity.enums.PropertyStatus;
import com.example.demo.entity.enums.PropertyType;
import com.example.demo.repository.AgentPropertyRepository;
import com.example.demo.repository.PropertyRepository;

@Service
public class PropertyServiceImpl
        implements PropertyService {

    @Autowired
    PropertyRepository propertyRepo;
    
    @Autowired
    private AgentPropertyRepository agentPropertyRepository;
 
    

    @Override
    public Property addProperty(
            Property property) {

        return propertyRepo.save(property);
    }

    @Override
    public Property updateProperty(
            UUID id,
            Property property) {

        Property old =
                propertyRepo.findById(id)
                        .orElse(null);

        if(old != null) {

            old.setName(
                    property.getName());

            old.setPrice(
                    property.getPrice());

            old.setType(
                    property.getType());

            old.setLocation(
                    property.getLocation());

            old.setAreaSqft(
                    property.getAreaSqft());

            old.setBuilderName(
                    property.getBuilderName());

            old.setPropertyStatus(
                    property.getPropertyStatus());

            old.setDescription(
                    property.getDescription());
            old.setLatitude(
                    property.getLatitude());

            old.setLongitude(
                    property.getLongitude());

            return propertyRepo.save(old);
        }

        return null;
    }

    @Override
    public String deleteProperty(
            UUID id) {

        propertyRepo.deleteById(id);

        return "Property Deleted Successfully";
    }

    @Override
    public Property getPropertyById(
            UUID id) {

        return propertyRepo.findById(id)
                .orElse(null);
    }

    @Override
    public Property getPropertyByName(
            String name) {

        return propertyRepo.findByName(name);
    }

    @Override
    public List<Property>
    getAllProperties() {

        return propertyRepo.findAll();
    }

    @Override
    public List<Property>
    getPropertiesByLocation(
            String location) {

        return propertyRepo.findByLocation(
                location);
    }

    @Override
    public List<Property>
    getPropertiesByType(
            String type) {

        return propertyRepo.findByType(
                PropertyType.valueOf(
                        type.toUpperCase()));
    }

    @Override
    public List<Property>
    getPropertiesByStatus(
            String status) {

        return propertyRepo.findByPropertyStatus(
                PropertyStatus.valueOf(
                        status.toUpperCase()));
    }

    @Override
    public List<Property>
    getPropertiesByBuilder(
            String builderName) {

        return propertyRepo.findByBuilderName(
                builderName);
    }
    
    @Override
    public List<Property> getAssignedProperties(UUID agentId){

        return agentPropertyRepository
                .findByAgent_UserId(agentId)
                .stream()
                .map(AgentProperty::getProperty)
                .toList();
    }
}

