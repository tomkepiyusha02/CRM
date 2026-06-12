
package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.demo.entity.enums.UserRole;

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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    private String name;

    private String email;

    private String mobile;

    private String password;

    private String location;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    // Manager & Agent
    private String assignedCity;

    // Agent Only
    private String assignedArea;

    // Agent Only
    private UUID assignedManagerId;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}