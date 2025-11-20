package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.entity.Python;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PythonRepo extends JpaRepository<Python, Long> {
    List<Python> findByStatus(String status);
}
