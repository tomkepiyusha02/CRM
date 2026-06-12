package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.MobileLoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user =
                userRepo.findByEmail(
                        request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Email"));

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!passwordMatch) {

            throw new RuntimeException(
                    "Invalid Password");
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole().name());

        return new LoginResponse(
                token,
                user.getRole().name(),
                user.getName()
        );
    }

    @PostMapping("/mobile-login")
    public LoginResponse mobileLogin(
            @RequestBody MobileLoginRequest request) {

        User user =
                userRepo.findByMobile(
                        request.getMobile())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Mobile Number Not Found"));

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole().name());

        return new LoginResponse(
                token,
                user.getRole().name(),
                user.getName()
        );
    }
}