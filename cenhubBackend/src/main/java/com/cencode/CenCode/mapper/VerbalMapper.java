package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.VerbalDto;
import com.cencode.CenCode.entity.Verbal;

public class VerbalMapper {
    public static Verbal mapToverbal(VerbalDto verbalDto){
        Verbal verbal = new Verbal();
        verbal.setId(verbalDto.getId());
        verbal.setQuestion(verbalDto.getQuestion());
        verbal.setOption1(verbalDto.getOption1());
        verbal.setOption2(verbalDto.getOption2());
        verbal.setOption3(verbalDto.getOption3());
        verbal.setOption4(verbalDto.getOption4());
        verbal.setCorrectOption(verbalDto.getCorrectOption());
        verbal.setExplanation(verbalDto.getExplanation());
        verbal.setSubject(verbalDto.getSubject());
        verbal.setSubjectCode(verbalDto.getSubjectCode());
//        verbal.setTopicCode(verbalDto.getTopicCode());
        return verbal;
    }

    public static VerbalDto mapToVerbalDto(Verbal verbal){
        VerbalDto verbalDto = new VerbalDto();
        verbalDto.setId(verbal.getId());
        verbalDto.setQuestion(verbal.getQuestion());
        verbalDto.setOption1(verbal.getOption1());
        verbalDto.setOption2(verbal.getOption2());
        verbalDto.setOption3(verbal.getOption3());
        verbalDto.setOption4(verbal.getOption4());
        verbalDto.setCorrectOption(verbal.getCorrectOption());
        verbalDto.setExplanation(verbal.getExplanation());
        verbalDto.setSubject(verbal.getSubject());
        verbalDto.setSubjectCode(verbal.getSubjectCode());
//        verbalDto.setTopicCode(verbal.getTopicCode());
        return verbalDto;
    }
}
