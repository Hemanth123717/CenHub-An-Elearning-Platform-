package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.CppProgrammingDto;
import com.cencode.CenCode.entity.CppProgramming;

public class CppProgrammingMapper {
    public static CppProgramming mapToCppProgramming(CppProgrammingDto cppProgrammingDto){
        CppProgramming cppProgramming = new CppProgramming();
        cppProgramming.setId(cppProgrammingDto.getId());
        cppProgramming.setQuestion(cppProgrammingDto.getQuestion());
        cppProgramming.setOption1(cppProgrammingDto.getOption1());
        cppProgramming.setOption2(cppProgrammingDto.getOption2());
        cppProgramming.setOption3(cppProgrammingDto.getOption3());
        cppProgramming.setOption4(cppProgrammingDto.getOption4());
        cppProgramming.setCorrectOption(cppProgrammingDto.getCorrectOption());
        cppProgramming.setExplanation(cppProgrammingDto.getExplanation());
        cppProgramming.setSubject(cppProgrammingDto.getSubject());
        cppProgramming.setSubjectCode(cppProgrammingDto.getSubjectCode());
//        cppProgramming.setTopicCode(cppProgrammingDto.getTopicCode());
        return cppProgramming;
    }

    public static CppProgrammingDto mapToCppProgrammingDto(CppProgramming cppProgramming){
        CppProgrammingDto cppProgrammingDto = new CppProgrammingDto();
        cppProgrammingDto.setId(cppProgramming.getId());
        cppProgrammingDto.setQuestion(cppProgramming.getQuestion());
        cppProgrammingDto.setOption1(cppProgramming.getOption1());
        cppProgrammingDto.setOption2(cppProgramming.getOption2());
        cppProgrammingDto.setOption3(cppProgramming.getOption3());
        cppProgrammingDto.setOption4(cppProgramming.getOption4());
        cppProgrammingDto.setCorrectOption(cppProgramming.getCorrectOption());
        cppProgrammingDto.setExplanation(cppProgramming.getExplanation());
        cppProgrammingDto.setSubject(cppProgramming.getSubject());
        cppProgrammingDto.setSubjectCode(cppProgramming.getSubjectCode());
//        cppProgrammingDto.setTopicCode(cppProgramming.getTopicCode());
        return cppProgrammingDto;
    }
}
