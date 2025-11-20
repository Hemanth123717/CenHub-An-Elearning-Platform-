package com.cencode.CenCode.dto;

import lombok.Data;

@Data
public class OtpVerificationDTO {
    private Long cenId;
    private String emailOtp;
}
