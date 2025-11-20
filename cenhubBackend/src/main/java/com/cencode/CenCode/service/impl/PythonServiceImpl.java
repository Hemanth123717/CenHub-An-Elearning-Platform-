package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.PythonDto;
import com.cencode.CenCode.entity.Python;
import com.cencode.CenCode.mapper.PythonMapper;
import com.cencode.CenCode.repository.PythonRepo;
import com.cencode.CenCode.service.PythonService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PythonServiceImpl implements PythonService {

    @Autowired
    private PythonRepo pythonRepo;

    @Override
    public List<PythonDto> allQuestions() {
        List<Python> pythonList = pythonRepo.findAll();
        return pythonList.stream().map(PythonMapper::mapToPythonDto).collect(Collectors.toList());
    }

    @Override
    public PythonDto findById(Long id) {
        Optional<Python> optionalPython = pythonRepo.findById(id);
        Python python = optionalPython.get();
        return PythonMapper.mapToPythonDto(python);
    }

    @Override
    public List<PythonDto> findQuestionsByIds(Long[] questionsList) {
        List<Python> pythonDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<Python> optionalPython = pythonRepo.findById(questionsList[i]);
            Python python = optionalPython.get();
            pythonDtoList.add(python);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return pythonDtoList.stream().map(PythonMapper::mapToPythonDto).collect(Collectors.toList());
    }

    @Override
    public PythonDto updateById(PythonDto pythonDto, Long id) {
        Optional<Python> optionalPython = pythonRepo.findById(id);
        Python python = optionalPython.get();
        pythonMethodFromDto(python, pythonDto);
        Python updatedPython = pythonRepo.save(python);
        return PythonMapper.mapToPythonDto(updatedPython);
    }

    private static void pythonMethodFromDto(Python python, PythonDto pythonDto){
        if(pythonDto.getQuestion() != null){
            python.setQuestion(pythonDto.getQuestion());
        }
        if(pythonDto.getOption1() != null){
            python.setOption1(pythonDto.getOption1());
        }
        if(pythonDto.getOption2() != null){
            python.setOption2(pythonDto.getOption2());
        }
        if(pythonDto.getOption3() != null){
            python.setOption3(pythonDto.getOption3());
        }
        if(pythonDto.getOption4() != null){
            python.setOption4(pythonDto.getOption4());
        }
        if(pythonDto.getExplanation() != null){
            python.setExplanation(pythonDto.getExplanation());
        }
        if(pythonDto.getCorrectOption() != null){
            python.setCorrectOption(pythonDto.getCorrectOption());
        }
        if(pythonDto.getStatus() != null){
            python.setStatus(pythonDto.getStatus());
        }
    }

    @Override
    public List<PythonDto> allActivePython(String status) {
        List<Python> pythonList = pythonRepo.findByStatus(status);
        return pythonList.stream().map(PythonMapper::mapToPythonDto).collect(Collectors.toList());
    }
}
