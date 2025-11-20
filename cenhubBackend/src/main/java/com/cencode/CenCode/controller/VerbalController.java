package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.dto.PythonDto;
import com.cencode.CenCode.dto.VerbalDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.VerbalService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/verbal/")
public class VerbalController {

    @Autowired
    private VerbalService verbalService;

    @GetMapping("verbalQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<VerbalDto> verbalById(@PathVariable Long id){
        VerbalDto verbalDto = verbalService.findById(id);
        return new ResponseEntity<>(verbalDto, HttpStatus.OK);
    }

    @GetMapping("verbalQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<VerbalDto>> verbalListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<VerbalDto> verbalDtos = verbalService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(verbalDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<VerbalDto>> allQuestion(){
        List<VerbalDto> verbalDtos = verbalService.allQuestions();
        return new ResponseEntity<>(verbalDtos, HttpStatus.OK);
    }

    @PatchMapping("updateverbal/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<VerbalDto> updateVerbal(@RequestBody VerbalDto verbalDto, @PathVariable Long id){
        VerbalDto updatedVerbalDto = verbalService.updateById(verbalDto, id);
        return new ResponseEntity<>(updatedVerbalDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<VerbalDto>> findByStatus(@PathVariable String status){
        List<VerbalDto> allActiveQuestions = verbalService.allActiveVerbal(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
