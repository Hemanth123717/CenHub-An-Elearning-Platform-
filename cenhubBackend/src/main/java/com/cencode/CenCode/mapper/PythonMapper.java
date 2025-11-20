package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.PythonDto;
import com.cencode.CenCode.entity.Python;

public class PythonMapper {
    public static Python mapTopython(PythonDto pythonDto){
        Python python = new Python();
        python.setId(pythonDto.getId());
        python.setQuestion(pythonDto.getQuestion());
        python.setOption1(pythonDto.getOption1());
        python.setOption2(pythonDto.getOption2());
        python.setOption3(pythonDto.getOption3());
        python.setOption4(pythonDto.getOption4());
        python.setCorrectOption(pythonDto.getCorrectOption());
        python.setExplanation(pythonDto.getExplanation());
        python.setSubject(pythonDto.getSubject());
        python.setSubjectCode(pythonDto.getSubjectCode());
//        python.setTopicCode(pythonDto.getTopicCode());
        return python;
    }

    public static PythonDto mapToPythonDto(Python python){
        PythonDto pythonDto = new PythonDto();
        pythonDto.setId(python.getId());
        pythonDto.setQuestion(python.getQuestion());
        pythonDto.setOption1(python.getOption1());
        pythonDto.setOption2(python.getOption2());
        pythonDto.setOption3(python.getOption3());
        pythonDto.setOption4(python.getOption4());
        pythonDto.setCorrectOption(python.getCorrectOption());
        pythonDto.setExplanation(python.getExplanation());
        pythonDto.setSubject(python.getSubject());
        pythonDto.setSubjectCode(python.getSubjectCode());
//        pythonDto.setTopicCode(python.getTopicCode());
        return pythonDto;
    }
}
