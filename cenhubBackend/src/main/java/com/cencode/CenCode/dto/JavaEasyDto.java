package com.cencode.CenCode.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class JavaEasyDto {
    private Integer Id;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
    private String explanation;
    private String status;
}