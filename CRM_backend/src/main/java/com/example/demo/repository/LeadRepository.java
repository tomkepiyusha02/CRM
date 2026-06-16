package com.example.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, UUID> {
	 boolean existsByEmail(String email);

	 boolean existsByMobileNo(String mobileNo);
	
}
