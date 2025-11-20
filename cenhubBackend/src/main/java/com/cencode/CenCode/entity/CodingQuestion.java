package com.cencode.CenCode.entity;




import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

@Setter
@Data
@Entity
@Table(name = "codingquestions")
public class CodingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String sampleInput;

    @Column(columnDefinition = "TEXT")
    private String sampleOutput;
}

