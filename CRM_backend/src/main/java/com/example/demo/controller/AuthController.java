package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.dto.SendOtpRequest;
import com.example.demo.dto.VerifyOtpRequest;
import com.example.demo.service.OtpService;


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
    
    @Autowired
    private OtpService otpService;

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
    @PostMapping("/send-otp")
    public String sendOtp(
            @RequestBody SendOtpRequest request) {

        User user =
                userRepo.findByEmail(
                        request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        if(user.getRole().name()
                .equals("ADMIN")) {

            otpService.sendOtp(
                    request.getEmail());

            return "OTP Sent";
        }

        throw new RuntimeException(
                "OTP Login Allowed Only For Admin");
    }
    @PostMapping("/verify-otp")
    public LoginResponse verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        boolean valid =
                otpService.verifyOtp(
                        request.getEmail(),
                        request.getOtp());

        if(!valid) {

            throw new RuntimeException(
                    "Invalid OTP");
        }

        

        User user =
                userRepo.findByEmail(
                        request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

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