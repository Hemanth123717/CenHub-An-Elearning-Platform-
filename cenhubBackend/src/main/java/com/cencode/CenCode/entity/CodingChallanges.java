package com.cencode.CenCode.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "codingChallanges")
public class CodingChallanges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
