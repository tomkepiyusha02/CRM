package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Lead;
import com.example.demo.repository.AgentPropertyRepository;
import com.example.demo.repository.LeadRepository;

@Service
public class LeadServiceImpl implements LeadService {

	@Autowired
	LeadRepository leadRepo;
	
	@Autowired
	private AgentPropertyRepository agentPropertyRepository;
	
	@Override
	public Lead addlead(Lead l) {
		
		if(leadRepo.existsByEmail(l.getEmail())) {

	        throw new RuntimeException(
	            "Email already exists"
	        );
	    }

		if(leadRepo.existsByMobileNo(l.getMobileNo())) 
		{
		    throw new RuntimeException("Mobile Already Exists");
		 
		}
	       
	    

	    return leadRepo.save(l);
	}

	@Override
	public List<Lead> getAllLeads() {
	
		return leadRepo.findAll();
	}

	@Override
	public Lead updateLead(UUID id, Lead l) {

	    Lead oldLead =
	            leadRepo.findById(id)
	                    .orElseThrow(() ->
	                            new RuntimeException("Lead Not Found"));

	    // Update Lead Status
	    oldLead.setStatus(
	            l.getStatus());

	    // Assign Agent
	    oldLead.setAssignedAgentId(
	            l.getAssignedAgentId());

	    oldLead.setAssignedAgentName(
	            l.getAssignedAgentName());

	    // Assign Property
	    oldLead.setPropertyId(
	            l.getPropertyId());

	    oldLead.setPropertyName(
	            l.getPropertyName());

	    // Validation
	    if (l.getAssignedAgentId() != null &&
	        l.getPropertyId() != null) {

	        boolean assigned =
	                agentPropertyRepository
	                        .existsByAgent_UserIdAndProperty_PropertyId(
	                                l.getAssignedAgentId(),
	                                l.getPropertyId());

	        if (!assigned) {

	            throw new RuntimeException(
	                    "Selected property is not assigned to this agent.");
	        }
	    }

	    return leadRepo.save(oldLead);
	}

	@Override
	public String deleteLead(UUID id) {
		leadRepo.deleteById(id);
		return "Lead Deleted";
	}

	@Override
	public Lead getLeadById(UUID id) {
		
		return leadRepo.findById(id).orElse(null);
	}
	@Override
	public List<Lead> getLeadsByCity(
	        String city
	) {

	    return leadRepo.findByLocation(
	            city
	    );
	}
	@Override
	public List<Lead> getAssignedLeads(
	        UUID userId) {

	    return leadRepo
	            .findByAssignedAgentId(
	                    userId);
	}
}
