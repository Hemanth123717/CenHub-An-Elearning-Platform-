package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.AptitudeDto;
import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.dto.JavaDto;
import com.cencode.CenCode.dto.PythonDto;
import com.cencode.CenCode.service.AptitudeService;
import com.cencode.CenCode.service.PythonService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/python/")
public class PythonController {

    @Autowired
    private PythonService pythonService;

    @GetMapping("pythonQuestion/{id}")
//    http://localhost:8080/api/Aptitude/AptitudeQuestion/{id}
    ResponseEntity<PythonDto> pythonById(@PathVariable Long id){
        PythonDto pythonDto = pythonService.findById(id);
        return new ResponseEntity<>(pythonDto, HttpStatus.OK);
    }

    @GetMapping("pythonQuestionsList/List")
//    http://localhost:8080/api/Aptitude/AptitudeQuestionsList/List?ids=1,2,3,4
    ResponseEntity<List<PythonDto>> pythonListQuestions(@RequestParam(name = "ids") List<Long> numberList){
        Long[] numArr = numberList.toArray(new Long[0]);
        List<PythonDto> pythonDtos = pythonService.findQuestionsByIds(numArr);
        return new ResponseEntity<>(pythonDtos,HttpStatus.OK);
    }

    @GetMapping("allQuestions")
//    http://localhost:8080/api/JavaEasy/allQuestions
    private ResponseEntity<List<PythonDto>> allQuestion(){
        List<PythonDto> pythonDtos = pythonService.allQuestions();
        return new ResponseEntity<>(pythonDtos, HttpStatus.OK);
    }

    @PatchMapping("updatepython/{id}")
//    http://localhost:8080/api/JavaEasy/updateJavaeasy/{id}
    private ResponseEntity<PythonDto> updatePython(@RequestBody PythonDto pythonDto, @PathVariable Long id){
        PythonDto updatedPythonDto = pythonService.updateById(pythonDto, id);
        return new ResponseEntity<>(updatedPythonDto,HttpStatus.OK);
    }

    @GetMapping("findByStatus/{status}")
//    http://localhost:8080/api/JavaEasy/findByStatus/{status}
    private ResponseEntity<List<PythonDto>> findByStatus(@PathVariable String status){
        List<PythonDto> allActiveQuestions = pythonService.allActivePython(status);
        return new ResponseEntity<>(allActiveQuestions, HttpStatus.OK);
    }
}
