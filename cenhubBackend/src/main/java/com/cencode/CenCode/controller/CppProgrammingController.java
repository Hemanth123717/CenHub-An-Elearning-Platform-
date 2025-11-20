package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.CppProgrammingDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.CppProgrammingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/cppprogramming/")
public class CppProgrammingController {

    @Autowired
    private CppProgrammingService cppProgrammingService;

    @GetMapping("cppprogrammingQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<CppProgrammingDto> cppProgrammingById(@PathVariable Long id){
        CppProgrammingDto cppProgrammingDto = cppProgrammingService.findById(id);
        return new ResponseEntity<>(cppProgrammingDto, HttpStatus.OK);
    }

    @GetMapping("cppprogrammingQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<CppProgrammingDto>> cppProgrammingListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<CppProgrammingDto> cppProgrammingDtos = cppProgrammingService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(cppProgrammingDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<CppProgrammingDto>> allQuestion(){
        List<CppProgrammingDto> cppProgrammingDtos = cppProgrammingService.allQuestions();
        return new ResponseEntity<>(cppProgrammingDtos, HttpStatus.OK);
    }

    @PatchMapping("updatecppprogramming/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<CppProgrammingDto> updateCppProgrmming(@RequestBody CppProgrammingDto cppProgrammingDto, @PathVariable Long id){
        CppProgrammingDto updatedCppProgrammingDto = cppProgrammingService.updateById(cppProgrammingDto, id);
        return new ResponseEntity<>(updatedCppProgrammingDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<CppProgrammingDto>> findByStatus(@PathVariable String status){
        List<CppProgrammingDto> allActiveQuestions = cppProgrammingService.allActiveCppProgramming(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
