package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.LeadNote;

@Repository
public interface LeadNoteRepository
extends JpaRepository<LeadNote, UUID> {

    List<LeadNote> findByLead_Leadid(UUID leadId);

}