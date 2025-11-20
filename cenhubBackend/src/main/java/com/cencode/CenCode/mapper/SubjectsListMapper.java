package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.SubjectsListDto;
import com.cencode.CenCode.entity.SubjectsList;

public class SubjectsListMapper {
    public static SubjectsListDto mapToSubjectListDto(SubjectsList subjectsList){
        SubjectsListDto subjectsListDto = new SubjectsListDto();
        subjectsListDto.setId(subjectsList.getId());
        subjectsListDto.setName(subjectsList.getName());
        return subjectsListDto;
    }

    public static SubjectsList mapToSubjectList(SubjectsListDto subjectsListDto){
        SubjectsList subjectsList = new SubjectsList();
        subjectsList.setId(subjectsListDto.getId());
        subjectsList.setName(subjectsListDto.getName());
        return subjectsList;
    }
}
