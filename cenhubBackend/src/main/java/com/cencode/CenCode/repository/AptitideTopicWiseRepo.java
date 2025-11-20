package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.AptitudeTopicWise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AptitideTopicWiseRepo extends JpaRepository<AptitudeTopicWise, Long> {
        List<AptitudeTopicWise> findBySubjectCodeAndStatus(String subjectCode, String status);
}
