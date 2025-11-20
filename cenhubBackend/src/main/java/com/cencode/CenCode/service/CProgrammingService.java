package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.CProgrammingDto;
import com.cencode.CenCode.dto.JavaEasyDto;

import java.util.List;

public interface CProgrammingService {
    List<CProgrammingDto> allQuestions();
    CProgrammingDto findById(Long id);
    List<CProgrammingDto> findQuestionsByIds(Long[] questionsList);
    CProgrammingDto updateById(CProgrammingDto cProgrammingDto, Long id);
    List<CProgrammingDto> allActiveCProgramming(String status);
}
