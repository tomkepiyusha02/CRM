package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.demo.entity.enums.LeadStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "leads")
public class Lead {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID leadid;
	@Column
	private String name;
	@Column
	private String email;
	@Column(name="mobile_no")
	private String mobileNo;
	@Column
	private String location;
	@Enumerated(EnumType.STRING)
	private LeadStatus status;
	@Column
	private String property_type;
	@Column
	private Double budget;
	private UUID assignedAgentId;

	private String assignedAgentName;
	@Column(length = 1000)
	private String Additional_requirement;
	
	private UUID propertyId;

	private String propertyName;
	
	 private LocalDateTime createdAt;
	 @PrePersist
	    protected void onCreate() {
	        createdAt = LocalDateTime.now();
	        if (status == null) {
	            status = LeadStatus.NEW;
	        }
	    }
	
	
}
