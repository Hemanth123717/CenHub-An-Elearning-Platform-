package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.entity.Verbal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerbalRepo extends JpaRepository<Verbal, Long> {
    List<Verbal> findByStatus(String status);
}
