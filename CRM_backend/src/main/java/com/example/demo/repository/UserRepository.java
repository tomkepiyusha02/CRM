

package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

import com.example.demo.entity.enums.UserRole;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    User findByName(String name);
    Optional<User> findByEmail(String email);

    List<User> findByAssignedCity(String assignedCity);

    List<User> findByAssignedArea(String assignedArea);

    List<User> findByAssignedManagerId(UUID assignedManagerId);

    List<User> findByRole(UserRole role);
    Optional<User> findByMobile(
            String mobile);
}

