package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.CppProgrammingDto;
import com.cencode.CenCode.dto.JavaEasyDto;

import java.util.List;

public interface CppProgrammingService {
    List<CppProgrammingDto> allQuestions();
    CppProgrammingDto findById(Long id);
    List<CppProgrammingDto> findQuestionsByIds(Long[] questionsList);
    CppProgrammingDto updateById(CppProgrammingDto cppProgrammingDto, Long id);
    List<CppProgrammingDto> allActiveCppProgramming(String status);
}
