package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.SiteVisitRequestDto;
import com.example.demo.entity.SiteVisit;
import com.example.demo.service.SiteVisitService;

@RestController
@RequestMapping("/visit")
@CrossOrigin("*")
public class SiteVisitController {

    @Autowired
    private SiteVisitService service;

    @PostMapping("/add")
    public ResponseEntity<SiteVisit> addVisit(
            @RequestBody SiteVisitRequestDto dto) {

        return ResponseEntity.ok(
                service.addSiteVisit(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SiteVisit>> getAll() {

        return ResponseEntity.ok(
                service.getAllSiteVisits());
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<SiteVisit>> getByAgent(
            @PathVariable UUID agentId) {

        return ResponseEntity.ok(
                service.getByAgent(agentId));
    }

    @GetMapping("/lead/{leadId}")
    public ResponseEntity<List<SiteVisit>> getByLead(
            @PathVariable UUID leadId) {

        return ResponseEntity.ok(
                service.getByLead(leadId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SiteVisit> update(
            @PathVariable UUID id,
            @RequestBody SiteVisit siteVisit) {

        return ResponseEntity.ok(
                service.updateSiteVisit(
                        id,
                        siteVisit));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(
            @PathVariable UUID id) {

        service.deleteSiteVisit(id);

        return ResponseEntity.ok(
                "Site Visit Deleted");
    }
}