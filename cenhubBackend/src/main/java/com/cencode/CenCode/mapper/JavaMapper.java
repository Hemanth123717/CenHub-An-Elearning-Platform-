package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.JavaDto;
import com.cencode.CenCode.entity.Java;

public class JavaMapper {
    public static Java mapToJava(JavaDto javaDto){
        Java java = new Java();
        java.setId(javaDto.getId());
        java.setQuestion(javaDto.getQuestion());
        java.setOption1(javaDto.getOption1());
        java.setOption2(javaDto.getOption2());
        java.setOption3(javaDto.getOption3());
        java.setOption4(javaDto.getOption4());
        java.setCorrectOption(javaDto.getCorrectOption());
        java.setExplanation(javaDto.getExplanation());
        java.setSubject(javaDto.getSubject());
        java.setSubjectCode(javaDto.getSubjectCode());
//        java.setTopicCode(javaDto.getTopicCode());
        return java;
    }

    public static JavaDto mapToJavaDto(Java java){
        JavaDto javaDto = new JavaDto();
        javaDto.setId(java.getId());
        javaDto.setQuestion(java.getQuestion());
        javaDto.setOption1(java.getOption1());
        javaDto.setOption2(java.getOption2());
        javaDto.setOption3(java.getOption3());
        javaDto.setOption4(java.getOption4());
        javaDto.setCorrectOption(java.getCorrectOption());
        javaDto.setExplanation(java.getExplanation());
        javaDto.setSubject(java.getSubject());
        javaDto.setSubjectCode(java.getSubjectCode());
//        javaDto.setTopicCode(java.getTopicCode());
        return javaDto;
    }
}
