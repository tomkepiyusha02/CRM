package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Lead;
import com.example.demo.service.LeadService;

@RestController
@RequestMapping("/Lead")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {
	
	@Autowired
       LeadService Service;
	

	@PostMapping("/add")
	public ResponseEntity<?> saveLead(
	        @RequestBody Lead l) {

	    try {

	        Lead lead = Service.addlead(l);

	        return ResponseEntity
	                .ok(lead);

	    }
	    catch(Exception e) {

	        return ResponseEntity
	                .badRequest()
	                .body(
	                 e.getMessage()
	                );
	    }
	}

    @GetMapping("/displayAll")
    public List<Lead> getAllLead() {

        return Service.getAllLeads();
    }

    
    @GetMapping("/{id}")
    public Lead getLeadById(
            @PathVariable UUID id) {

        return Service.getLeadById(id);
    }

    
    @PutMapping("/update/{id}")
    public Lead updateLead(
            @PathVariable UUID id,
            @RequestBody Lead l) {

        return Service.updateLead(id, l);
    }

    
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(
            @PathVariable UUID id) {

        return Service.deleteLead(id);
    }
	

}
