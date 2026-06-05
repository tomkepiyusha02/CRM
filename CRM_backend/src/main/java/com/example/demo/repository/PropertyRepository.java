package com.example.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Property;

public interface PropertyRepository extends JpaRepository<Property, UUID> {

}
