
package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService us;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return us.addUser(user);
    }

    @GetMapping("/displayAll")
    public List<User> getAllUsers() {
        return us.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return us.getUserById(id);
    }

    @GetMapping("/name/{name}")
    public User getUserByName(@PathVariable String name) {
        return us.getUserByName(name);
    }

    @GetMapping("/city/{city}")
    public List<User> getByCity(@PathVariable String city) {
        return us.getByAssignedCity(city);
    }

    @GetMapping("/area/{area}")
    public List<User> getByArea(@PathVariable String area) {
        return us.getByAssignedArea(area);
    }

    @GetMapping("/manager/{managerId}")
    public List<User> getAgentsByManager(
            @PathVariable UUID managerId) {

        return us.getAgentsByManager(managerId);
    }

    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable UUID id,
            @RequestBody User user) {

        return us.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(
            @PathVariable UUID id) {

        return us.deleteUser(id);
    }
    @GetMapping("/managers")
    public List<User> getAllManagers() {

        return us.getAllManagers();
    }

    @GetMapping("/agents")
    public List<User> getAllAgents() {

        return us.getAllAgents();
    }
}