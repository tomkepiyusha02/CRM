package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import com.example.demo.entity.enums.FollowUpStatus;
import com.example.demo.entity.enums.LeadStatus;
import com.example.demo.entity.enums.ReminderType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowUp {
	  @Id
	    @GeneratedValue(strategy = GenerationType.UUID)
	    private UUID followupId;

	    @ManyToOne
	    @JoinColumn(name = "lead_id")
	    private Lead lead;

	    @ManyToOne
	    @JoinColumn(name = "agent_id")
	    private User agent;

	    private LocalDate followupDate;

	    private LocalTime followupTime;

	    private String notes;

	    @Enumerated(EnumType.STRING)
	    private FollowUpStatus status;

	    @Enumerated(EnumType.STRING)
	    private ReminderType reminderType;

	    private LocalDateTime createdAt;

	    @PrePersist
	    protected void onCreate() {
	        createdAt = LocalDateTime.now();
	       
	    }
}
