package com.cencode.CenCode.controller;

import com.cencode.CenCode.entity.CodingQuestion;
import com.cencode.CenCode.repository.CodingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class CodingQuestionController {

    @Autowired
    private CodingQuestionRepository repo;

    @GetMapping("/{id}")
    public CodingQuestion getQuestion(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }
}

