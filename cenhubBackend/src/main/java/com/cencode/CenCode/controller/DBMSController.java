package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.CProgrammingDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.DBMSService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/dbms/")
public class DBMSController {

    @Autowired
    private DBMSService dbmsService;

    @GetMapping("dbmsQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<DBMSDto> dBMSById(@PathVariable Long id){
        DBMSDto dbmsDto = dbmsService.findById(id);
        return new ResponseEntity<>(dbmsDto, HttpStatus.OK);
    }

    @GetMapping("dbmsQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<DBMSDto>> dBMSListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<DBMSDto> dbmsDtos = dbmsService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(dbmsDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<DBMSDto>> allQuestion(){
        List<DBMSDto> dbmsDtos = dbmsService.allQuestions();
        return new ResponseEntity<>(dbmsDtos, HttpStatus.OK);
    }

    @PatchMapping("updatedbms/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<DBMSDto> updateDBMS(@RequestBody DBMSDto dbmsDto, @PathVariable Long id){
        DBMSDto updatedDBMSDto = dbmsService.updateById(dbmsDto, id);
        return new ResponseEntity<>(updatedDBMSDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<DBMSDto>> findByStatus(@PathVariable String status){
        List<DBMSDto> allActiveQuestions = dbmsService.allActiveDBMS(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
