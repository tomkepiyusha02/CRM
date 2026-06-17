package com.example.demo.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Property;

import com.example.demo.entity.enums.PropertyStatus;
import com.example.demo.entity.enums.PropertyType;

public interface PropertyRepository extends JpaRepository<Property, UUID> {

    Property findByName(String name);

    List<Property> findByLocation(String location);

    List<Property> findByType(PropertyType type);

    List<Property> findByPropertyStatus(
            PropertyStatus propertyStatus);

    List<Property> findByBuilderName(
            String builderName);
    
   
}

