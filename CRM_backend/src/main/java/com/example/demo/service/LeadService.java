package com.example.demo.service;



import java.util.List;
import java.util.UUID;

import com.example.demo.entity.Lead;

public interface LeadService  {
	
	Lead addlead(Lead l);
	List<Lead> getAllLeads();
	Lead getLeadById(UUID id);
	Lead updateLead(UUID id,Lead l);
	String deleteLead(UUID id);
	List<Lead> getLeadsByCity(
		    String city
		);
	
}
