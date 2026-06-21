package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.LeadNote;
import com.example.demo.service.LeadNoteService;

@RestController
@RequestMapping("/notes")
@CrossOrigin("*")
public class LeadNoteController {

    @Autowired
    private LeadNoteService service;

    @PostMapping("/add")
    public ResponseEntity<LeadNote> addNote(
            @RequestBody LeadNote note) {

        return ResponseEntity.ok(
                service.addNote(note));
    }

    @GetMapping("/lead/{leadId}")
    public ResponseEntity<List<LeadNote>> getByLead(
            @PathVariable UUID leadId) {

        return ResponseEntity.ok(
                service.getByLead(leadId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(
            @PathVariable UUID id) {

        service.deleteNote(id);

        return ResponseEntity.ok(
                "Note Deleted");
    }
}