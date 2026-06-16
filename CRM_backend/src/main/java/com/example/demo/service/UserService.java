package com.example.demo.service;


import java.util.List;
import java.util.UUID;

import com.example.demo.entity.User;


public interface UserService {

    User addUser(User user);

    User updateUser(UUID id, User user);

    String deleteUser(UUID id);

    User getUserById(UUID id);

    User getUserByName(String name);

    List<User> getAllUsers();

    List<User> getByAssignedCity(String city);

    List<User> getByAssignedArea(String area);

    List<User> getAgentsByManager(UUID managerId);

    List<User> getAllManagers();

    List<User> getAllAgents();
}

