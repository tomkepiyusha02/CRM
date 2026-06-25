package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import com.example.demo.entity.enums.FollowUpStatus;
import com.example.demo.entity.enums.ReminderType;
import com.example.demo.entity.enums.SiteVisitStatus;

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
public class SiteVisit {
	  @Id
	    @GeneratedValue(strategy = GenerationType.UUID)
	    private UUID visitId;

	    @ManyToOne
	    @JoinColumn(name = "lead_id")
	    private Lead lead;

	    @ManyToOne
	    @JoinColumn(name = "agent_id")
	    private User agent;

	    @ManyToOne
	    @JoinColumn(name = "property_id")
	    private Property property;

	    private LocalDate visitDate;

	    private LocalTime visitTime;

	    private String customerFeedback;

	    private String remarks;

	    @Enumerated(EnumType.STRING)
	    private SiteVisitStatus status;

	    private LocalDateTime createdAt;

	    @PrePersist
	    protected void onCreate() {
	        createdAt = LocalDateTime.now();
	       
	    }
}
