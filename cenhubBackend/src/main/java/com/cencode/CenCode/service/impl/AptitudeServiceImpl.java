package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.entity.Aptitude;
import com.cencode.CenCode.mapper.AptitudeMapper;
import com.cencode.CenCode.repository.AptitudeRepo;
import com.cencode.CenCode.service.AptitudeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AptitudeServiceImpl implements AptitudeService {

    @Autowired
    private AptitudeRepo aptitudeRepo;

    @Override
    public List<AptitudeDto> allQuestions() {
        List<Aptitude> aptitudeList = aptitudeRepo.findAll();
        return aptitudeList.stream().map(AptitudeMapper::mapToAptitudeDto).collect(Collectors.toList());
    }

    @Override
    public AptitudeDto findById(Long id) {
        Optional<Aptitude> optionalAptitude = aptitudeRepo.findById(id);
        Aptitude aptitude = optionalAptitude.get();
        return AptitudeMapper.mapToAptitudeDto(aptitude);
    }

    @Override
    public List<AptitudeDto> findQuestionsByIds(Long[] questionsList) {
        List<Aptitude> aptitudeDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<Aptitude> optionalAptitude = aptitudeRepo.findById(questionsList[i]);
            Aptitude aptitude = optionalAptitude.get();
            aptitudeDtoList.add(aptitude);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return aptitudeDtoList.stream().map(AptitudeMapper::mapToAptitudeDto).collect(Collectors.toList());
    }

    @Override
    public AptitudeDto updateById(AptitudeDto aptitudeDto, Long id) {
        Optional<Aptitude> optionalAptitude = aptitudeRepo.findById(id);
        Aptitude aptitude = optionalAptitude.get();
        updatedAptitudeMethodFromDto(aptitude, aptitudeDto);
        Aptitude updatedAptitude = aptitudeRepo.save(aptitude);
        return AptitudeMapper.mapToAptitudeDto(updatedAptitude);
    }

    private static void updatedAptitudeMethodFromDto(Aptitude updatedAptitude, AptitudeDto aptitudeDto){
        if(aptitudeDto.getQuestion() != null){
            updatedAptitude.setQuestion(aptitudeDto.getQuestion());
        }
        if(aptitudeDto.getOption1() != null){
            updatedAptitude.setOption1(aptitudeDto.getOption1());
        }
        if(aptitudeDto.getOption2() != null){
            updatedAptitude.setOption2(aptitudeDto.getOption2());
        }
        if(aptitudeDto.getOption3() != null){
            updatedAptitude.setOption3(aptitudeDto.getOption3());
        }
        if(aptitudeDto.getOption4() != null){
            updatedAptitude.setOption4(aptitudeDto.getOption4());
        }
        if(aptitudeDto.getExplanation() != null){
            updatedAptitude.setExplanation(aptitudeDto.getExplanation());
        }
        if(aptitudeDto.getCorrectOption() != null){
            updatedAptitude.setCorrectOption(aptitudeDto.getCorrectOption());
        }
        if(aptitudeDto.getStatus() != null){
            updatedAptitude.setStatus(aptitudeDto.getStatus());
        }
    }

    @Override
    public List<AptitudeDto> allActiveAptitude(String status) {
        List<Aptitude> aptitudeList = aptitudeRepo.findByStatus(status);
        return aptitudeList.stream().map(AptitudeMapper::mapToAptitudeDto).collect(Collectors.toList());
    }
}
