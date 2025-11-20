package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.entity.DBMS;

public class DBMSMapper {
    public static DBMS mapToDBMS(DBMSDto dbmsDto){
        DBMS dbms = new DBMS();
        dbms.setId(dbmsDto.getId());
        dbms.setQuestion(dbmsDto.getQuestion());
        dbms.setOption1(dbmsDto.getOption1());
        dbms.setOption2(dbmsDto.getOption2());
        dbms.setOption3(dbmsDto.getOption3());
        dbms.setOption4(dbmsDto.getOption4());
        dbms.setCorrectOption(dbmsDto.getCorrectOption());
        dbms.setExplanation(dbmsDto.getExplanation());
        dbms.setSubject(dbmsDto.getSubject());
        dbms.setSubjectCode(dbmsDto.getSubjectCode());
//        dbms.setTopicCode(dbmsDto.getTopicCode());
        return dbms;
    }

    public static DBMSDto mapToDBMSDto(DBMS dbms){
        DBMSDto dbmsDto = new DBMSDto();
        dbmsDto.setId(dbms.getId());
        dbmsDto.setQuestion(dbms.getQuestion());
        dbmsDto.setOption1(dbms.getOption1());
        dbmsDto.setOption2(dbms.getOption2());
        dbmsDto.setOption3(dbms.getOption3());
        dbmsDto.setOption4(dbms.getOption4());
        dbmsDto.setCorrectOption(dbms.getCorrectOption());
        dbmsDto.setExplanation(dbms.getExplanation());
        dbmsDto.setSubject(dbms.getSubject());
        dbmsDto.setSubjectCode(dbms.getSubjectCode());
//        dbmsDto.setTopicCode(dbms.getTopicCode());
        return dbmsDto;
    }
}
