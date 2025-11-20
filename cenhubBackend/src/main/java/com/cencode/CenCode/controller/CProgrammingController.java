package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.CProgrammingDto;
import com.cencode.CenCode.dto.CppProgrammingDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.CProgrammingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/cprogramming/")
public class CProgrammingController {

    @Autowired
    private CProgrammingService cProgrammingService;

    @GetMapping("cprogrammingQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<CProgrammingDto> cProgrammingById(@PathVariable Long id){
        CProgrammingDto cProgrammingDto = cProgrammingService.findById(id);
        return new ResponseEntity<>(cProgrammingDto, HttpStatus.OK);
    }

    @GetMapping("cprogrammingQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<CProgrammingDto>> cProgrammingListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<CProgrammingDto> cProgrammingDtos = cProgrammingService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(cProgrammingDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<CProgrammingDto>> allQuestion(){
        List<CProgrammingDto> cProgrammingDtos = cProgrammingService.allQuestions();
        return new ResponseEntity<>(cProgrammingDtos, HttpStatus.OK);
    }

    @PatchMapping("updatecprogramming/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<CProgrammingDto> updateCProgrmming(@RequestBody CProgrammingDto cProgrammingDto, @PathVariable Long id){
        CProgrammingDto updatedCProgrammingDto = cProgrammingService.updateById(cProgrammingDto, id);
        return new ResponseEntity<>(updatedCProgrammingDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<CProgrammingDto>> findByStatus(@PathVariable String status){
        List<CProgrammingDto> allActiveQuestions = cProgrammingService.allActiveCProgramming(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
