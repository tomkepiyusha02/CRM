package com.example.demo.entity;


import java.time.LocalDateTime;
import java.util.UUID;

import com.example.demo.entity.enums.PropertyStatus;
import com.example.demo.entity.enums.PropertyType;

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
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID propertyId;

    private String name;

    private double price;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    private String location;

    private double areaSqft;

    private String builderName;
    
    
    private String imageUrl;
    

    @Enumerated(EnumType.STRING)
    private PropertyStatus propertyStatus;

    private String description;
    
    private Double latitude;

    private Double longitude;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        if(propertyStatus == null) {
            propertyStatus = PropertyStatus.AVAILABLE;
        }
    }
}

