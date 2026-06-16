package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class SendOtpRequest {
	private String email;

}
