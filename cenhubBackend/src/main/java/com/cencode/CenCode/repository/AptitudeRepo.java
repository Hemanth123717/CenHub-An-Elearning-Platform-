package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Aptitude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptitudeRepo extends JpaRepository<Aptitude, Long> {
    List<Aptitude> findByStatus(String status);
}
