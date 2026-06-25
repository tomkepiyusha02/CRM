package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AssignPropertyDto;
import com.example.demo.entity.AgentProperty;
import com.example.demo.entity.Property;
import com.example.demo.service.AgentPropertyService;

@RestController
@RequestMapping("/agent-property")
@CrossOrigin("*")
public class AgentPropertyController {

    @Autowired
    private AgentPropertyService service;

    @PostMapping("/assign")
    public ResponseEntity<AgentProperty> assignProperty(
            @RequestBody AssignPropertyDto dto){

        return ResponseEntity.ok(
                service.assignProperty(dto));
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<Property>> getProperties(
            @PathVariable UUID agentId){

        return ResponseEntity.ok(
                service.getPropertiesByAgent(agentId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAssignment(
            @PathVariable UUID id){

        service.removeAssignment(id);

        return ResponseEntity.ok(
                "Assignment Removed");
    }
}