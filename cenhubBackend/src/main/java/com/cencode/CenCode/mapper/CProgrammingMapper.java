package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.CProgrammingDto;
import com.cencode.CenCode.entity.CProgramming;

public class CProgrammingMapper {
    public static CProgramming mapToCPRogramming(CProgrammingDto cProgrammingDto){
        CProgramming cProgramming = new CProgramming();
        cProgramming.setId(cProgrammingDto.getId());
        cProgramming.setQuestion(cProgrammingDto.getQuestion());
        cProgramming.setOption1(cProgrammingDto.getOption1());
        cProgramming.setOption2(cProgrammingDto.getOption2());
        cProgramming.setOption3(cProgrammingDto.getOption3());
        cProgramming.setOption4(cProgrammingDto.getOption4());
        cProgramming.setCorrectOption(cProgrammingDto.getCorrectOption());
        cProgramming.setExplanation(cProgrammingDto.getExplanation());
        cProgramming.setSubject(cProgrammingDto.getSubject());
        cProgramming.setSubjectCode(cProgrammingDto.getSubjectCode());
//        cProgramming.setTopicCode(cProgrammingDto.getTopicCode());
        return cProgramming;
    }

    public static CProgrammingDto mapToCProgrammingDto(CProgramming cProgramming){
        CProgrammingDto cProgrammingDto = new CProgrammingDto();
        cProgrammingDto.setId(cProgramming.getId());
        cProgrammingDto.setQuestion(cProgramming.getQuestion());
        cProgrammingDto.setOption1(cProgramming.getOption1());
        cProgrammingDto.setOption2(cProgramming.getOption2());
        cProgrammingDto.setOption3(cProgramming.getOption3());
        cProgrammingDto.setOption4(cProgramming.getOption4());
        cProgrammingDto.setCorrectOption(cProgramming.getCorrectOption());
        cProgrammingDto.setExplanation(cProgramming.getExplanation());
        cProgrammingDto.setSubject(cProgramming.getSubject());
        cProgrammingDto.setSubjectCode(cProgramming.getSubjectCode());
//        cProgrammingDto.setTopicCode(cProgramming.getTopicCode());
        return cProgrammingDto;
    }
}
