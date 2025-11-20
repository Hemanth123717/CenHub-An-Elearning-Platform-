package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.JavaEasyDto;
import com.cencode.CenCode.dto.PythonDto;

import java.util.List;

public interface PythonService {
    List<PythonDto> allQuestions();
    PythonDto findById(Long id);
    List<PythonDto> findQuestionsByIds(Long[] questionsList);
    PythonDto updateById(PythonDto pythonDto, Long id);
    List<PythonDto> allActivePython(String status);
}
