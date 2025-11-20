package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.service.AptitudeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/aptitude/")
public class AptitudeController {

    @Autowired
    private AptitudeService aptitudeService;

    @GetMapping("aptitudeQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<AptitudeDto> aptitudeById(@PathVariable Long id){
        AptitudeDto aptitudeDto = aptitudeService.findById(id);
        return new ResponseEntity<>(aptitudeDto, HttpStatus.OK);
    }

    @GetMapping("aptitudeQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<AptitudeDto>> aptitudeListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<AptitudeDto> aptitudeDto = aptitudeService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(aptitudeDto,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<AptitudeDto>> allQuestion(){
        List<AptitudeDto> aptitudeDtos = aptitudeService.allQuestions();
        return new ResponseEntity<>(aptitudeDtos, HttpStatus.OK);
    }

    @PatchMapping("updateaptitude/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<AptitudeDto> updateAptitude(@RequestBody AptitudeDto aptitudeDto, @PathVariable Long id){
        AptitudeDto updatedAptitudeDto = aptitudeService.updateById(aptitudeDto, id);
        return new ResponseEntity<>(updatedAptitudeDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<AptitudeDto>> findByStatus(@PathVariable String status){
        List<AptitudeDto> allActiveQuestions = aptitudeService.allActiveAptitude(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
