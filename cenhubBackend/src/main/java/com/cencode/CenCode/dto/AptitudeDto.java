package com.cencode.CenCode.dto;

import lombok.Data;

@Data
public class AptitudeDto {
    private Long id;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctOption;
    private String explanation;
    private String subject;
    private String subjectCode;
    private String status;
//    private String topicCode;
}
