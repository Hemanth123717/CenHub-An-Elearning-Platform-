package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.entity.CProgramming;
import com.cencode.CenCode.entity.CppProgramming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CppProgrammingRepo extends JpaRepository<CppProgramming, Long> {
    List<CppProgramming> findByStatus(String status);
}
