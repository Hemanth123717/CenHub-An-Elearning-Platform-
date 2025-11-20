package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.JavaDto;
import com.cencode.CenCode.dto.JavaEasyDto;

import java.util.List;

public interface JavaService {
    List<JavaDto> allQuestions();
    JavaDto findById(Long id);
    List<JavaDto> findQuestionsByIds(Long[] questionsList);
    JavaDto updateById(JavaDto javaDto, Long id);
    List<JavaDto> allActiveJava(String status);
}
