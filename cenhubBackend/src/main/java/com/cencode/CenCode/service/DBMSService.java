package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.dto.JavaEasyDto;
import com.cencode.CenCode.entity.DBMS;

import java.util.List;

public interface DBMSService {
    List<DBMSDto> allQuestions();
    DBMSDto findById(Long id);
    List<DBMSDto> findQuestionsByIds(Long[] questionsList);
    DBMSDto updateById(DBMSDto dbmsDto, Long id);
    List<DBMSDto> allActiveDBMS(String status);
}
