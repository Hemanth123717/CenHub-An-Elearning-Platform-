//package com.cencode.CenCode.entity.allsubsmcq;
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.AllArgsConstructor;
//
//import java.util.List;
//
//@Entity
//@Table(name = "tests")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class TestEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String subject;
//
//    private String topic;
//
//    @ElementCollection
//    @CollectionTable(name = "test_question_ids", joinColumns = @JoinColumn(name = "test_id"))
//    @Column(name = "question_id")
//    private List<Long> questionIds;
//}
