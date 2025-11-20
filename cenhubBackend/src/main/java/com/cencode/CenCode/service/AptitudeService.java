package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.JavaEasyDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public interface AptitudeService {
    List<AptitudeDto> allQuestions();
    AptitudeDto findById(Long id);
    List<AptitudeDto> findQuestionsByIds(Long[] questionsList);
    AptitudeDto updateById(AptitudeDto aptitudeDto, Long id);
    List<AptitudeDto> allActiveAptitude(String status);
}
