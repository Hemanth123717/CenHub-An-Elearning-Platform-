package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.entity.Aptitude;

public class AptitudeMapper {
    public static Aptitude mapToAptitude(AptitudeDto aptitudeDto){
        Aptitude aptitude = new Aptitude();
        aptitude.setId(aptitudeDto.getId());
        aptitude.setQuestion(aptitudeDto.getQuestion());
        aptitude.setOption1(aptitudeDto.getOption1());
        aptitude.setOption2(aptitudeDto.getOption2());
        aptitude.setOption3(aptitudeDto.getOption3());
        aptitude.setOption4(aptitudeDto.getOption4());
        aptitude.setCorrectOption(aptitudeDto.getCorrectOption());
        aptitude.setExplanation(aptitudeDto.getExplanation());
        aptitude.setSubject(aptitudeDto.getSubject());
        aptitude.setSubjectCode(aptitudeDto.getSubjectCode());
//        aptitude.setTopicCode(aptitudeDto.getTopicCode());
        return aptitude;
    }

    public static AptitudeDto mapToAptitudeDto(Aptitude aptitude){
        AptitudeDto aptitudeDto = new AptitudeDto();
        aptitudeDto.setId(aptitude.getId());
        aptitudeDto.setQuestion(aptitude.getQuestion());
        aptitudeDto.setOption1(aptitude.getOption1());
        aptitudeDto.setOption2(aptitude.getOption2());
        aptitudeDto.setOption3(aptitude.getOption3());
        aptitudeDto.setOption4(aptitude.getOption4());
        aptitudeDto.setCorrectOption(aptitude.getCorrectOption());
        aptitudeDto.setExplanation(aptitude.getExplanation());
        aptitudeDto.setSubject(aptitude.getSubject());
        aptitudeDto.setSubjectCode(aptitude.getSubjectCode());
//        aptitudeDto.setTopicCode(aptitude.getTopicCode());
        return aptitudeDto;
    }
}
