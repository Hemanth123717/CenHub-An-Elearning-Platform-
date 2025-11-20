package com.cencode.CenCode.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;

    private String language;

    @Column(columnDefinition = "TEXT")
    private String code;

    private double timeTaken;

    private double marks;

    private LocalDateTime submissionTime;

    @PrePersist
    protected void onCreate() {
        this.submissionTime = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
}
