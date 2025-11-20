package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.SubjectsListDto;
import com.cencode.CenCode.entity.SubjectsList;

import java.util.List;

public interface SubjectListService {
    List<SubjectsListDto> getAllSubjects();
    SubjectsListDto addSubjects(SubjectsList subjectsList);
}
