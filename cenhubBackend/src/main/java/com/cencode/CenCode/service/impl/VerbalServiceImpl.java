package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.VerbalDto;
import com.cencode.CenCode.entity.Verbal;
import com.cencode.CenCode.mapper.VerbalMapper;
import com.cencode.CenCode.repository.VerbalRepo;
import com.cencode.CenCode.service.VerbalService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VerbalServiceImpl implements VerbalService {

    @Autowired
    private VerbalRepo verbalRepo;

    @Override
    public List<VerbalDto> allQuestions() {
        List<Verbal> verbalList = verbalRepo.findAll();
        return verbalList.stream().map(VerbalMapper::mapToVerbalDto).collect(Collectors.toList());
    }

    @Override
    public VerbalDto findById(Long id) {
        Optional<Verbal> optionalVerbal = verbalRepo.findById(id);
        Verbal verbal = optionalVerbal.get();
        return VerbalMapper.mapToVerbalDto(verbal);
    }

    @Override
    public List<VerbalDto> findQuestionsByIds(Long[] questionsList) {
        List<Verbal> verbalDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<Verbal> optionalVerbal = verbalRepo.findById(questionsList[i]);
            Verbal verbal = optionalVerbal.get();
            verbalDtoList.add(verbal);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return verbalDtoList.stream().map(VerbalMapper::mapToVerbalDto).collect(Collectors.toList());
    }

    @Override
    public VerbalDto updateById(VerbalDto verbalDto, Long id) {
        Optional<Verbal> optionalVerbal = verbalRepo.findById(id);
        Verbal verbal = optionalVerbal.get();
        verbalMethodFromDto(verbal, verbalDto);
        Verbal updatedVerbal = verbalRepo.save(verbal);
        return VerbalMapper.mapToVerbalDto(updatedVerbal);
    }

    private static void verbalMethodFromDto(Verbal verbal, VerbalDto verbalDto){
        if(verbalDto.getQuestion() != null){
            verbal.setQuestion(verbalDto.getQuestion());
        }
        if(verbalDto.getOption1() != null){
            verbal.setOption1(verbalDto.getOption1());
        }
        if(verbalDto.getOption2() != null){
            verbal.setOption2(verbalDto.getOption2());
        }
        if(verbalDto.getOption3() != null){
            verbal.setOption3(verbalDto.getOption3());
        }
        if(verbalDto.getOption4() != null){
            verbal.setOption4(verbalDto.getOption4());
        }
        if(verbalDto.getExplanation() != null){
            verbal.setExplanation(verbalDto.getExplanation());
        }
        if(verbalDto.getCorrectOption() != null){
            verbal.setCorrectOption(verbalDto.getCorrectOption());
        }
        if(verbalDto.getStatus() != null){
            verbal.setStatus(verbalDto.getStatus());
        }
    }

    @Override
    public List<VerbalDto> allActiveVerbal(String status) {
        List<Verbal> verbalList = verbalRepo.findByStatus(status);
        return verbalList.stream().map(VerbalMapper::mapToVerbalDto).collect(Collectors.toList());
    }
}
