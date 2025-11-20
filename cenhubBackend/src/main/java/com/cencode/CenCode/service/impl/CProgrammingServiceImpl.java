package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.CProgrammingDto;
import com.cencode.CenCode.entity.CProgramming;
import com.cencode.CenCode.mapper.CProgrammingMapper;
import com.cencode.CenCode.repository.CProgrammingRepo;
import com.cencode.CenCode.service.CProgrammingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CProgrammingServiceImpl implements CProgrammingService {

    @Autowired
    private CProgrammingRepo cProgrammingRepo;

    @Override
    public List<CProgrammingDto> allQuestions() {
        List<CProgramming> cProgrammingList = cProgrammingRepo.findAll();
        return cProgrammingList.stream().map(CProgrammingMapper::mapToCProgrammingDto).collect(Collectors.toList());
    }

    @Override
    public CProgrammingDto findById(Long id) {
        Optional<CProgramming> optionalAptitude = cProgrammingRepo.findById(id);
        CProgramming cProgramming = optionalAptitude.get();
        return CProgrammingMapper.mapToCProgrammingDto(cProgramming);
    }

    @Override
    public List<CProgrammingDto> findQuestionsByIds(Long[] questionsList) {
        List<CProgramming> cProgrammingDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<CProgramming> optionalCProgramming = cProgrammingRepo.findById(questionsList[i]);
            CProgramming cProgramming = optionalCProgramming.get();
            cProgrammingDtoList.add(cProgramming);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return cProgrammingDtoList.stream().map(CProgrammingMapper::mapToCProgrammingDto).collect(Collectors.toList());
    }

    @Override
    public CProgrammingDto updateById(CProgrammingDto cProgrammingDto, Long id) {
        Optional<CProgramming> optionalCProgramming = cProgrammingRepo.findById(id);
        CProgramming cProgramming = optionalCProgramming.get();
        updatedCProgrammingMethodFromDto(cProgramming, cProgrammingDto);
        CProgramming updatedCProgramming = cProgrammingRepo.save(cProgramming);
        return CProgrammingMapper.mapToCProgrammingDto(updatedCProgramming);
    }

    private static void updatedCProgrammingMethodFromDto(CProgramming updatedCProgramming, CProgrammingDto cProgrammingDto){
        if(cProgrammingDto.getQuestion() != null){
            updatedCProgramming.setQuestion(cProgrammingDto.getQuestion());
        }
        if(cProgrammingDto.getOption1() != null){
            updatedCProgramming.setOption1(cProgrammingDto.getOption1());
        }
        if(cProgrammingDto.getOption2() != null){
            updatedCProgramming.setOption2(cProgrammingDto.getOption2());
        }
        if(cProgrammingDto.getOption3() != null){
            updatedCProgramming.setOption3(cProgrammingDto.getOption3());
        }
        if(cProgrammingDto.getOption4() != null){
            updatedCProgramming.setOption4(cProgrammingDto.getOption4());
        }
        if(cProgrammingDto.getExplanation() != null){
            updatedCProgramming.setExplanation(cProgrammingDto.getExplanation());
        }
        if(cProgrammingDto.getCorrectOption() != null){
            updatedCProgramming.setCorrectOption(cProgrammingDto.getCorrectOption());
        }
        if(cProgrammingDto.getStatus() != null){
            updatedCProgramming.setStatus(cProgrammingDto.getStatus());
        }
    }

    @Override
    public List<CProgrammingDto> allActiveCProgramming(String status) {
        List<CProgramming> cProgrammingList = cProgrammingRepo.findByStatus(status);
        return cProgrammingList.stream().map(CProgrammingMapper::mapToCProgrammingDto).collect(Collectors.toList());
    }
}
