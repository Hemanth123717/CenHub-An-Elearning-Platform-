package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.entity.WebDevelopment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebDevelopmentRepo extends JpaRepository<WebDevelopment, Long> {
    List<WebDevelopment> findByStatus(String status);
}
