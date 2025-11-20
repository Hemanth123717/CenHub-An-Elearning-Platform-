package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.CppProgrammingDto;
import com.cencode.CenCode.entity.CppProgramming;
import com.cencode.CenCode.mapper.CppProgrammingMapper;
import com.cencode.CenCode.repository.CppProgrammingRepo;
import com.cencode.CenCode.service.CppProgrammingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CppProgrammingServiceImpl implements CppProgrammingService {

    @Autowired
    private CppProgrammingRepo cppProgrammingRepo;

    @Override
    public List<CppProgrammingDto> allQuestions() {
        List<CppProgramming> cppProgrammingList = cppProgrammingRepo.findAll();
        return cppProgrammingList.stream().map(CppProgrammingMapper::mapToCppProgrammingDto).collect(Collectors.toList());
    }

    @Override
    public CppProgrammingDto findById(Long id) {
        Optional<CppProgramming> optionalCppProgramming = cppProgrammingRepo.findById(id);
        CppProgramming cppProgramming = optionalCppProgramming.get();
        return CppProgrammingMapper.mapToCppProgrammingDto(cppProgramming);
    }

    @Override
    public List<CppProgrammingDto> findQuestionsByIds(Long[] questionsList) {
        List<CppProgramming> cppProgrammingDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<CppProgramming> optionalCppProgramming = cppProgrammingRepo.findById(questionsList[i]);
            CppProgramming cppProgramming = optionalCppProgramming.get();
//            CppProgrammingDto cppProgrammingDto = CppProgrammingMapper.mapToCppProgrammingDto(cppProgramming);
            cppProgrammingDtoList.add(cppProgramming);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return cppProgrammingDtoList.stream().map(CppProgrammingMapper::mapToCppProgrammingDto).collect(Collectors.toList());
    }

    @Override
    public CppProgrammingDto updateById(CppProgrammingDto cppProgrammingDto, Long id) {
        Optional<CppProgramming> optionalCppProgramming = cppProgrammingRepo.findById(id);
        CppProgramming cppProgramming = optionalCppProgramming.get();
        updatedCppProgrammingMethodFromDto(cppProgramming, cppProgrammingDto);
        CppProgramming updatedCppProgramming = cppProgrammingRepo.save(cppProgramming);
        return CppProgrammingMapper.mapToCppProgrammingDto(updatedCppProgramming);
    }

    private static void updatedCppProgrammingMethodFromDto(CppProgramming updatedCppProgramming, CppProgrammingDto cppProgrammingDto){
        if(cppProgrammingDto.getQuestion() != null){
            updatedCppProgramming.setQuestion(cppProgrammingDto.getQuestion());
        }
        if(cppProgrammingDto.getOption1() != null){
            updatedCppProgramming.setOption1(cppProgrammingDto.getOption1());
        }
        if(cppProgrammingDto.getOption2() != null){
            updatedCppProgramming.setOption2(cppProgrammingDto.getOption2());
        }
        if(cppProgrammingDto.getOption3() != null){
            updatedCppProgramming.setOption3(cppProgrammingDto.getOption3());
        }
        if(cppProgrammingDto.getOption4() != null){
            updatedCppProgramming.setOption4(cppProgrammingDto.getOption4());
        }
        if(cppProgrammingDto.getExplanation() != null){
            updatedCppProgramming.setExplanation(cppProgrammingDto.getExplanation());
        }
        if(cppProgrammingDto.getCorrectOption() != null){
            updatedCppProgramming.setCorrectOption(cppProgrammingDto.getCorrectOption());
        }
        if(cppProgrammingDto.getStatus() != null){
            updatedCppProgramming.setStatus(cppProgrammingDto.getStatus());
        }
    }

    @Override
    public List<CppProgrammingDto> allActiveCppProgramming(String status) {
        List<CppProgramming> cppProgrammingList = cppProgrammingRepo.findByStatus(status);
        return cppProgrammingList.stream().map(CppProgrammingMapper::mapToCppProgrammingDto).collect(Collectors.toList());
    }
}
