package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.JavaEasyDto;
import com.cencode.CenCode.dto.WebDevelopmentDto;

import java.util.List;

public interface WebDevelopmentService {
    List<WebDevelopmentDto> allQuestions();
    WebDevelopmentDto findById(Long id);
    List<WebDevelopmentDto> findQuestionsByIds(Long[] questionsList);
    WebDevelopmentDto updateById(WebDevelopmentDto webDevelopmentDto, Long id);
    List<WebDevelopmentDto> allActiveWebDevelopment(String status);
}
