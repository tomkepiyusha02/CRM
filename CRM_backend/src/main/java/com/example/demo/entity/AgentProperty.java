package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AgentProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User agent;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    private LocalDateTime assignedAt;

    @PrePersist
    public void onCreate() {
        assignedAt = LocalDateTime.now();
    }
}