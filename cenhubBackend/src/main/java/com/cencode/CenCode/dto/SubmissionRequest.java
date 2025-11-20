package com.cencode.CenCode.dto;

import lombok.Data;

@Data
public class SubmissionRequest {
    private Long questionId;
    private String language;
    private String code;
    private double timeTaken;
    private double marks;
    private Long clientId;  // link to client
}

