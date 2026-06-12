package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.entity.enums.UserRole;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(User user) {

        if(userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email Already Exists");
        }

        if(userRepo.existsByMobile(user.getMobile())) {
            throw new RuntimeException("Mobile Already Exists");
        }
        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepo.save(user);
    }

    @Override
    public User updateUser(UUID id, User user) {

        User old = userRepo.findById(id).orElse(null);

        if(old != null) {

            old.setName(user.getName());
            old.setEmail(user.getEmail());
            old.setMobile(user.getMobile());
            if(user.getPassword()!=null
                    && !user.getPassword().isBlank()) {

                old.setPassword(
                        passwordEncoder.encode(
                                user.getPassword()
                        )
                );
            }
            old.setLocation(user.getLocation());
            old.setAssignedCity(user.getAssignedCity());
            old.setAssignedArea(user.getAssignedArea());
            old.setAssignedManagerId(user.getAssignedManagerId());

            return userRepo.save(old);
        }

        return null;
    }

    @Override
    public String deleteUser(UUID id) {

        userRepo.deleteById(id);

        return "User Deleted Successfully";
    }

    @Override
    public User getUserById(UUID id) {

        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User getUserByName(String name) {

        return userRepo.findByName(name);
    }

    @Override
    public List<User> getAllUsers() {

        return userRepo.findAll();
    }

    @Override
    public List<User> getByAssignedCity(String city) {

        return userRepo.findByAssignedCity(city);
    }

    @Override
    public List<User> getByAssignedArea(String area) {

        return userRepo.findByAssignedArea(area);
    }

    @Override
    public List<User> getAgentsByManager(UUID managerId) {

        return userRepo.findByAssignedManagerId(managerId);
    }
    @Override
    public List<User> getAllManagers() {

        return userRepo.findByRole(UserRole.MANAGER);
    }

    @Override
    public List<User> getAllAgents() {

        return userRepo.findByRole(UserRole.AGENT);
    }
}