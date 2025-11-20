package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.JavaEasyDto;
import com.cencode.CenCode.dto.VerbalDto;

import java.util.List;

public interface VerbalService {
    List<VerbalDto> allQuestions();
    VerbalDto findById(Long id);
    List<VerbalDto> findQuestionsByIds(Long[] questionsList);
    VerbalDto updateById(VerbalDto verbalDto, Long id);
    List<VerbalDto> allActiveVerbal(String status);
}
