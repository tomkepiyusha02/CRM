package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
       LeadService ls;
	
	@PostMapping("/add")
    public Lead saveLead(
            @RequestBody Lead l) {

        return ls.addlead(l);
    }

    @GetMapping("/displayAll")
    public List<Lead> getAllLead() {

        return ls.getAllLeads();
    }

    
    @GetMapping("/{id}")
    public Lead getLeadById(
            @PathVariable UUID id) {

        return ls.getLeadById(id);
    }

    
    @PutMapping("/update/{id}")
    public Lead updateCustomer(
            @PathVariable UUID id,
            @RequestBody Lead l) {

        return ls.updateLead(id, l);
    }

    
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(
            @PathVariable UUID id) {

        return ls.deleteLead(id);
    }
	

}
