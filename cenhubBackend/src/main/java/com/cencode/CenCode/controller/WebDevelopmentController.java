package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.dto.VerbalDto;
import com.cencode.CenCode.dto.WebDevelopmentDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.WebDevelopmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/webdevelopment/")
public class WebDevelopmentController {

    @Autowired
    private WebDevelopmentService webDevelopmentService;

    @GetMapping("webdevelopmentQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<WebDevelopmentDto> webdevelopmentById(@PathVariable Long id){
        WebDevelopmentDto webDevelopmentDto = webDevelopmentService.findById(id);
        return new ResponseEntity<>(webDevelopmentDto, HttpStatus.OK);
    }

    @GetMapping("aptitudeQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<WebDevelopmentDto>> webdevelopmentListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<WebDevelopmentDto> webDevelopmentDtos = webDevelopmentService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(webDevelopmentDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<WebDevelopmentDto>> allQuestion(){
        List<WebDevelopmentDto> webDevelopmentDtos = webDevelopmentService.allQuestions();
        return new ResponseEntity<>(webDevelopmentDtos, HttpStatus.OK);
    }

    @PatchMapping("updatewebdevelopment/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<WebDevelopmentDto> updateWebDevelopment(@RequestBody WebDevelopmentDto webDevelopmentDto, @PathVariable Long id){
        WebDevelopmentDto updatedWebDevelopmentDto = webDevelopmentService.updateById(webDevelopmentDto, id);
        return new ResponseEntity<>(webDevelopmentDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<WebDevelopmentDto>> findByStatus(@PathVariable String status){
        List<WebDevelopmentDto> allActiveQuestions = webDevelopmentService.allActiveWebDevelopment(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
