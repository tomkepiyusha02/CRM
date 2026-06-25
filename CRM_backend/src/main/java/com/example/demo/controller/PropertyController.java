package com.example.demo.controller;



import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Property;
import com.example.demo.entity.enums.PropertyStatus;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.service.PropertyService;

@RestController
@RequestMapping("/property")
@CrossOrigin("*")
public class PropertyController {

    @Autowired
    PropertyService ps;
    
    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping("/add")
    public Property addProperty(
            @RequestBody Property property) {

        return ps.addProperty(property);
    }

    @GetMapping("/displayAll")
    public List<Property>
    getAllProperties() {

        return ps.getAllProperties();
    }

    @GetMapping("/{id}")
    public Property getPropertyById(
            @PathVariable UUID id) {

        return ps.getPropertyById(id);
    }

    @GetMapping("/name/{name}")
    public Property getPropertyByName(
            @PathVariable String name) {

        return ps.getPropertyByName(name);
    }

    @GetMapping("/location/{location}")
    public List<Property>
    getByLocation(
            @PathVariable String location) {

        return ps.getPropertiesByLocation(
                location);
    }

    @GetMapping("/type/{type}")
    public List<Property>
    getByType(
            @PathVariable String type) {

        return ps.getPropertiesByType(
                type);
    }

    @GetMapping("/status/{status}")
    public List<Property>
    getByStatus(
            @PathVariable String status) {

        return ps.getPropertiesByStatus(
                status);
    }

    @GetMapping("/builder/{builder}")
    public List<Property>
    getByBuilder(
            @PathVariable String builder) {

        return ps.getPropertiesByBuilder(
                builder);
    }

    @PutMapping("/update/{id}")
    public Property updateProperty(
            @PathVariable UUID id,
            @RequestBody Property property) {

        return ps.updateProperty(
                id,
                property);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProperty(
            @PathVariable UUID id) {

        return ps.deleteProperty(id);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable UUID id,
            @RequestParam PropertyStatus status) {

        Property property =
                propertyRepository
                        .findById(id)
                        .orElseThrow();

        property.setPropertyStatus(status);

        propertyRepository.save(property);

        return ResponseEntity.ok(
                "Property Status Updated"
        );
    }
    
    @GetMapping("/agent/{agentId}")
    public List<Property> getAssignedProperties(
            @PathVariable UUID agentId){

        return ps.getAssignedProperties(agentId);
    }
}

