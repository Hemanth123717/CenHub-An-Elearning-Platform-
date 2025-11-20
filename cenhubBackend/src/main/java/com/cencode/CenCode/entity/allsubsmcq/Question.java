//package com.cencode.CenCode.entity.allsubsmcq;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.AllArgsConstructor;
//
//@Entity
//@Table(name = "all_mcq_subject_questions")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Question {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String question;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String option1;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String option2;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String option3;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String option4;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String correctOption;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String explanation;
//
//    @Column(nullable = false)
//    private String subject;
//
//    @Column(nullable = false)
//    private String subjectCode;
//
//    @Column(nullable = false)
//    private String topic;
//
//    @Column(nullable = false)
//    private String status;
//
//    @PrePersist
//    public void prePersist() {
//        if (this.status == null) {
//            this.status = "active";
//        }
//    }
//}
