package com.example.demo.service;

public interface OtpService {

	 void sendOtp(String email);

	    boolean verifyOtp(
	            String email,
	            String otp);
}
