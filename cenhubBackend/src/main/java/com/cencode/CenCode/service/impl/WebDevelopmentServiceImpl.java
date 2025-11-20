package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.WebDevelopmentDto;
import com.cencode.CenCode.entity.WebDevelopment;
import com.cencode.CenCode.mapper.WebDevelopmentMapper;
import com.cencode.CenCode.repository.WebDevelopmentRepo;
import com.cencode.CenCode.service.WebDevelopmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WebDevelopmentServiceImpl implements WebDevelopmentService {

    @Autowired
    private WebDevelopmentRepo webDevelopmentRepo;

    @Override
    public List<WebDevelopmentDto> allQuestions() {
        List<WebDevelopment> webDevelopmentList = webDevelopmentRepo.findAll();
        return webDevelopmentList.stream().map(WebDevelopmentMapper::mapToWebDevelopmentDto).collect(Collectors.toList());
    }

    @Override
    public WebDevelopmentDto findById(Long id) {
        Optional<WebDevelopment> optionalWebDevelopment = webDevelopmentRepo.findById(id);
        WebDevelopment webDevelopment = optionalWebDevelopment.get();
        return WebDevelopmentMapper.mapToWebDevelopmentDto(webDevelopment);
    }

    @Override
    public List<WebDevelopmentDto> findQuestionsByIds(Long[] questionsList) {
        List<WebDevelopment> webDevelopmentDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<WebDevelopment> optionalWebDevelopment = webDevelopmentRepo.findById(questionsList[i]);
            WebDevelopment webDevelopment = optionalWebDevelopment.get();
            webDevelopmentDtoList.add(webDevelopment);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return webDevelopmentDtoList.stream().map(WebDevelopmentMapper::mapToWebDevelopmentDto).collect(Collectors.toList());
    }

    @Override
    public WebDevelopmentDto updateById(WebDevelopmentDto webDevelopmentDto, Long id) {
        Optional<WebDevelopment> optionalWebDevelopment = webDevelopmentRepo.findById(id);
        WebDevelopment webDevelopment = optionalWebDevelopment.get();
        webDevelopmentMethodFromDto(webDevelopment, webDevelopmentDto);
        WebDevelopment updatedWebDevelopment = webDevelopmentRepo.save(webDevelopment);
        return WebDevelopmentMapper.mapToWebDevelopmentDto(updatedWebDevelopment);
    }

    private static void webDevelopmentMethodFromDto(WebDevelopment webDevelopment, WebDevelopmentDto webDevelopmentDto){
        if(webDevelopmentDto.getQuestion() != null){
            webDevelopment.setQuestion(webDevelopmentDto.getQuestion());
        }
        if(webDevelopmentDto.getOption1() != null){
            webDevelopment.setOption1(webDevelopmentDto.getOption1());
        }
        if(webDevelopmentDto.getOption2() != null){
            webDevelopment.setOption2(webDevelopmentDto.getOption2());
        }
        if(webDevelopmentDto.getOption3() != null){
            webDevelopment.setOption3(webDevelopmentDto.getOption3());
        }
        if(webDevelopmentDto.getOption4() != null){
            webDevelopment.setOption4(webDevelopmentDto.getOption4());
        }
        if(webDevelopmentDto.getExplanation() != null){
            webDevelopment.setExplanation(webDevelopmentDto.getExplanation());
        }
        if(webDevelopmentDto.getCorrectOption() != null){
            webDevelopment.setCorrectOption(webDevelopmentDto.getCorrectOption());
        }
        if(webDevelopmentDto.getStatus() != null){
            webDevelopment.setStatus(webDevelopmentDto.getStatus());
        }
    }

    @Override
    public List<WebDevelopmentDto> allActiveWebDevelopment(String status) {
        List<WebDevelopment> webDevelopmentList = webDevelopmentRepo.findByStatus(status);
        return webDevelopmentList.stream().map(WebDevelopmentMapper::mapToWebDevelopmentDto).collect(Collectors.toList());
    }
}
