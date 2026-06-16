package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpServiceImpl
        implements OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String>
            otpStorage =
            new HashMap<>();

    @Override
    public void sendOtp(
            String email) {

        String otp =
                String.valueOf(
                        100000 +
                        new Random()
                                .nextInt(
                                        900000));

        otpStorage.put(
                email,
                otp);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Real Estate CRM Login OTP");

        message.setText(
                "Your OTP is : "
                        + otp
                        + "\n\nValid for login.");

        mailSender.send(
                message);

        System.out.println(
                "OTP Sent To "
                        + email
                        + " : "
                        + otp);
    }

    @Override
    public boolean verifyOtp(
            String email,
            String otp) {

        String savedOtp =
                otpStorage.get(email);

        return savedOtp != null
                && savedOtp.equals(otp);
    }
}