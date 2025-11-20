package com.cencode.CenCode.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cppprogrammingQuestion")
public class CppProgramming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String option1;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String option2;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String option3;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String option4;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String correctOption;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String explanation;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String subject;
    @Column(nullable = false)
    private String subjectCode;
    @Column(nullable = false)
    private String status;

    @PrePersist
    void prePresist(){
        if(this.status == null){
            this.status = "active";
        }
    }
//    @Column(nullable = false)
//    private String topicCode;
}
