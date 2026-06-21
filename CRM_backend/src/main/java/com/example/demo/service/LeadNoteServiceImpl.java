package com.example.demo.service;





import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LeadNote;
import com.example.demo.repository.LeadNoteRepository;


@Service
public class LeadNoteServiceImpl
        implements LeadNoteService {

    @Autowired
    private LeadNoteRepository repository;

    @Override
    public LeadNote addNote(
            LeadNote note) {

        return repository.save(
                note);
    }

    @Override
    public List<LeadNote> getByLead(
            UUID leadId) {

        return repository
                .findByLead_Leadid(
                        leadId);
    }

    @Override
    public void deleteNote(
            UUID noteId) {

        repository.deleteById(
                noteId);
    }
}