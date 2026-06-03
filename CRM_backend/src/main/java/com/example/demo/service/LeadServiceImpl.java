package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Lead;
import com.example.demo.repository.LeadRepository;

@Service
public class LeadServiceImpl implements LeadService {

	@Autowired
	LeadRepository lr;
	
	@Override
	public Lead addlead(Lead l) {
		
		return lr.save(l);
	}

	@Override
	public List<Lead> getAllLeads() {
	
		return lr.findAll();
	}


	@Override
	public Lead updateLead(UUID id, Lead l) {

	    Lead old = lr.findById(id).orElse(null);

	    if (old != null) {

	        if (l.getEmail() != null)
	            old.setEmail(l.getEmail());

	        if (l.getMobile_no() != null)
	            old.setMobile_no(l.getMobile_no());

	        if (l.getLocation() != null)
	            old.setLocation(l.getLocation());

	        if (l.getProperty_type() != null)
	            old.setProperty_type(l.getProperty_type());

	        return lr.save(old);
	    }

	    return null;
	}

	@Override
	public String deleteLead(UUID id) {
		lr.deleteById(id);
		return "Lead Deleted";
	}

	@Override
	public Lead getLeadById(UUID id) {
		
		return lr.findById(id).orElse(null);
	}

}
