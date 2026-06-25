package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.FollowUpRequestDto;
import com.example.demo.entity.FollowUp;
import com.example.demo.service.FollowUpService;

@RestController
@RequestMapping("/followup")
@CrossOrigin("*")
public class FollowUpController {

    @Autowired
    private FollowUpService service;

    @PostMapping("/add")
    public ResponseEntity<FollowUp> addFollowUp(
            @RequestBody FollowUpRequestDto dto) {

        return ResponseEntity.ok(
                service.addFollowUp(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<FollowUp>> getAll() {

        return ResponseEntity.ok(
                service.getAllFollowUps());
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<FollowUp>> getByAgent(
            @PathVariable UUID agentId) {

        return ResponseEntity.ok(
                service.getByAgent(agentId));
    }

    @GetMapping("/lead/{leadId}")
    public ResponseEntity<List<FollowUp>> getByLead(
            @PathVariable UUID leadId) {

        return ResponseEntity.ok(
                service.getByLead(leadId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FollowUp> update(
            @PathVariable UUID id,
            @RequestBody FollowUp followUp) {

        return ResponseEntity.ok(
                service.updateFollowUp(
                        id,
                        followUp));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(
            @PathVariable UUID id) {

        service.deleteFollowUp(id);

        return ResponseEntity.ok(
                "FollowUp Deleted");
    }
}