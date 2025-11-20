package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.dto.JavaDto;
import com.cencode.CenCode.entity.Java;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.JavaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/java/")
public class JavaController {

    @Autowired
    private JavaService javaService;

    @GetMapping("javaQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<JavaDto> javaById(@PathVariable Long id){
        JavaDto javaDto = javaService.findById(id);
        return new ResponseEntity<>(javaDto, HttpStatus.OK);
    }

    @GetMapping("javaQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<JavaDto>> javaListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<JavaDto> javaDtos = javaService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(javaDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<JavaDto>> allQuestion(){
        List<JavaDto> javaDtos = javaService.allQuestions();
        return new ResponseEntity<>(javaDtos, HttpStatus.OK);
    }

    @PatchMapping("updatejava/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<JavaDto> updateJava(@RequestBody JavaDto javaDto, @PathVariable Long id){
        JavaDto updatedJavaDto = javaService.updateById(javaDto, id);
        return new ResponseEntity<>(updatedJavaDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<JavaDto>> findByStatus(@PathVariable String status){
        List<JavaDto> allActiveQuestions = javaService.allActiveJava(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
