package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.JavaDto;
import com.cencode.CenCode.entity.Java;
import com.cencode.CenCode.mapper.JavaMapper;
import com.cencode.CenCode.repository.JavaRepo;
import com.cencode.CenCode.service.JavaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JavaServiceImpl implements JavaService {

    @Autowired
    private JavaRepo javaRepo;

    @Override
    public List<JavaDto> allQuestions() {
        List<Java> javaList = javaRepo.findAll();
        return javaList.stream().map(JavaMapper::mapToJavaDto).collect(Collectors.toList());
    }

    @Override
    public JavaDto findById(Long id) {
        Optional<Java> optionalJava = javaRepo.findById(id);
        Java java = optionalJava.get();
        return JavaMapper.mapToJavaDto(java);
    }

    @Override
    public List<JavaDto> findQuestionsByIds(Long[] questionsList) {
        List<Java> javaDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<Java> optionalJava = javaRepo.findById(questionsList[i]);
            Java java = optionalJava.get();
            javaDtoList.add(java);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return javaDtoList.stream().map(JavaMapper::mapToJavaDto).collect(Collectors.toList());
    }

    @Override
    public JavaDto updateById(JavaDto javaDto, Long id) {
        Optional<Java> optionalJava = javaRepo.findById(id);
        Java java = optionalJava.get();
        javaMethodFromDto(java, javaDto);
        Java updatedJava = javaRepo.save(java);
        return JavaMapper.mapToJavaDto(updatedJava);
    }

    private static void javaMethodFromDto(Java java, JavaDto javaDto){
        if(javaDto.getQuestion() != null){
            java.setQuestion(javaDto.getQuestion());
        }
        if(javaDto.getOption1() != null){
            java.setOption1(javaDto.getOption1());
        }
        if(javaDto.getOption2() != null){
            java.setOption2(javaDto.getOption2());
        }
        if(javaDto.getOption3() != null){
            java.setOption3(javaDto.getOption3());
        }
        if(javaDto.getOption4() != null){
            java.setOption4(javaDto.getOption4());
        }
        if(javaDto.getExplanation() != null){
            java.setExplanation(javaDto.getExplanation());
        }
        if(javaDto.getCorrectOption() != null){
            java.setCorrectOption(javaDto.getCorrectOption());
        }
        if(javaDto.getStatus() != null){
            java.setStatus(javaDto.getStatus());
        }
    }

    @Override
    public List<JavaDto> allActiveJava(String status) {
        List<Java> javaList = javaRepo.findByStatus(status);
        return javaList.stream().map(JavaMapper::mapToJavaDto).collect(Collectors.toList());
    }
}
