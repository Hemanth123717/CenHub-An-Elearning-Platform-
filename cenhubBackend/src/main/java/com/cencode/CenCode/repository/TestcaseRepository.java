package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Testcases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestcaseRepository extends JpaRepository<Testcases, Long> {
    List<Testcases> findByQuestionId(Long questionId);
}

