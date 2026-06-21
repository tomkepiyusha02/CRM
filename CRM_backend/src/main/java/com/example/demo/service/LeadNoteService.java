package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.entity.LeadNote;

public interface LeadNoteService {

    LeadNote addNote(LeadNote note);

    List<LeadNote> getByLead(UUID leadId);

    void deleteNote(UUID noteId);
}