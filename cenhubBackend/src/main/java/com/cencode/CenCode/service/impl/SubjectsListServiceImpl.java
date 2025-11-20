package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.SubjectsListDto;
import com.cencode.CenCode.entity.SubjectsList;
import com.cencode.CenCode.mapper.SubjectsListMapper;
import com.cencode.CenCode.repository.SubjectsListRepo;
import com.cencode.CenCode.service.SubjectListService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubjectsListServiceImpl implements SubjectListService {

    private final SubjectsListRepo subjectsListRepo;

    @Override
    public List<SubjectsListDto> getAllSubjects() {
        List<SubjectsList> optionalSubjectsListDto = subjectsListRepo.findAll();
        return optionalSubjectsListDto.stream().map(SubjectsListMapper::mapToSubjectListDto).collect(Collectors.toList());
    }

    @Override
    public SubjectsListDto addSubjects(SubjectsList subjectsList) {
        SubjectsList newSubjectsList = subjectsListRepo.save(subjectsList);
        return SubjectsListMapper.mapToSubjectListDto(newSubjectsList);
    }
}
