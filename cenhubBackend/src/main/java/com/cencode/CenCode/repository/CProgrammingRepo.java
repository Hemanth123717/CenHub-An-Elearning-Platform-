package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.entity.CProgramming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CProgrammingRepo extends JpaRepository<CProgramming, Long> {
    List<CProgramming> findByStatus(String status);
}
