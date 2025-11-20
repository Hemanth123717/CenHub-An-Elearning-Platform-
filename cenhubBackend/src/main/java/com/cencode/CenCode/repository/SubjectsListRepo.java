package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.SubjectsList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectsListRepo extends JpaRepository<SubjectsList, Long> {
}
