package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.WebDevelopmentDto;
import com.cencode.CenCode.entity.WebDevelopment;

public class WebDevelopmentMapper {
    public static WebDevelopment mapTowebDevelopment(WebDevelopmentDto webDevelopmentDto){
        WebDevelopment webDevelopment = new WebDevelopment();
        webDevelopment.setId(webDevelopmentDto.getId());
        webDevelopment.setQuestion(webDevelopmentDto.getQuestion());
        webDevelopment.setOption1(webDevelopmentDto.getOption1());
        webDevelopment.setOption2(webDevelopmentDto.getOption2());
        webDevelopment.setOption3(webDevelopmentDto.getOption3());
        webDevelopment.setOption4(webDevelopmentDto.getOption4());
        webDevelopment.setCorrectOption(webDevelopmentDto.getCorrectOption());
        webDevelopment.setExplanation(webDevelopmentDto.getExplanation());
        webDevelopment.setSubject(webDevelopmentDto.getSubject());
        webDevelopment.setSubjectCode(webDevelopmentDto.getSubjectCode());
//        webDevelopment.setTopicCode(webDevelopmentDto.getTopicCode());
        return webDevelopment;
    }

    public static WebDevelopmentDto mapToWebDevelopmentDto(WebDevelopment webDevelopment){
        WebDevelopmentDto webDevelopmentDto = new WebDevelopmentDto();
        webDevelopmentDto.setId(webDevelopment.getId());
        webDevelopmentDto.setQuestion(webDevelopment.getQuestion());
        webDevelopmentDto.setOption1(webDevelopment.getOption1());
        webDevelopmentDto.setOption2(webDevelopment.getOption2());
        webDevelopmentDto.setOption3(webDevelopment.getOption3());
        webDevelopmentDto.setOption4(webDevelopment.getOption4());
        webDevelopmentDto.setCorrectOption(webDevelopment.getCorrectOption());
        webDevelopmentDto.setExplanation(webDevelopment.getExplanation());
        webDevelopmentDto.setSubject(webDevelopment.getSubject());
        webDevelopmentDto.setSubjectCode(webDevelopment.getSubjectCode());
//        webDevelopmentDto.setTopicCode(webDevelopment.getTopicCode());
        return webDevelopmentDto;
    }
}
