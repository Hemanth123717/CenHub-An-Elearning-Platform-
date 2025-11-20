package com.cencode.CenCode.entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "codingTestcases")
public class Testcases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;

    @Column(columnDefinition = "TEXT")
    private String testcaseInput;

    @Column(columnDefinition = "TEXT")
    private String testcaseOutput;
}

