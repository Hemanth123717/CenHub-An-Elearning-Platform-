package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.SubjectsListDto;
import com.cencode.CenCode.entity.SubjectsList;
import com.cencode.CenCode.mapper.SubjectsListMapper;
import com.cencode.CenCode.service.SubjectListService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/SubjectsList")
@AllArgsConstructor
//@PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
public class SubjectListController {
    private final SubjectListService subjectListService;

//    @GetMapping("/getAllSubjects")
//    private ResponseEntity<List<SubjectsListDto>> getAllSubs(){
//        List<SubjectsListDto> allSubs = subjectListService.getAllSubjects();
//        return new ResponseEntity<>(allSubs, HttpStatus.OK);
//    }

    private static final Logger logger = LoggerFactory.getLogger(SubjectListController.class);

    @GetMapping("/getAllSubjects")
    private ResponseEntity<List<SubjectsListDto>> getAllSubs(){
        logger.debug("Inside getAllSubs method.");
        if (subjectListService == null) {
            logger.error("subjectListService is not injected!");
        } else {
            logger.debug("subjectListService is injected successfully.");
        }
        List<SubjectsListDto> allSubs = subjectListService.getAllSubjects();
        return new ResponseEntity<>(allSubs, HttpStatus.OK);
    }

    @PostMapping("/addSubject")
    private ResponseEntity<SubjectsListDto> addSubject(@RequestBody SubjectsListDto subjectsListDto){
        SubjectsListDto newSubjectsListDto = subjectListService.addSubjects(SubjectsListMapper.mapToSubjectList(subjectsListDto));
        return new ResponseEntity<>(newSubjectsListDto, HttpStatus.CREATED);
    }
}
