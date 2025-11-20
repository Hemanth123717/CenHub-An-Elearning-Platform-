//package com.cencode.CenCode.entity.allsubsmcq;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/allSubsQuestions")
//public class QuestionController {
//
//    @Autowired
//    private QuestionService questionService;
//
//    /**
//     * Get all subjects with their topics
//     */
//    @GetMapping("/subjects/topics")
//    public ResponseEntity<List<SubjectTopicsDTO>> getSubjectsWithTopics() {
//        return ResponseEntity.ok(questionService.getAllSubjectsWithTopics());
//    }
//
//    /**
//     * Add questions in bulk
//     */
//    @PostMapping("/questions")
//    public ResponseEntity<String> addQuestions(@RequestBody List<QuestionDTO> questions) {
//        questionService.saveQuestions(questions);
//        return ResponseEntity.ok("Questions saved successfully.");
//    }
//
//    /**
//     * Generate tests for a subject (topic-wise)
//     * @param subject - subject name
//     * @param questionsPerTopic - number of questions per topic (default 10)
//     */
//    @GetMapping("/tests/{subject}")
//    public ResponseEntity<List<TestResultDTO>> generateTests(
//            @PathVariable String subject,
//            @RequestParam(defaultValue = "10") int questionsPerTopic) {
//        return ResponseEntity.ok(questionService.generateOrGetTestsForSubject(subject, questionsPerTopic));
//    }
//
//    /**
//     * Get question by ID
//     */
//    @GetMapping("/questions/{id}")
//    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
//        return questionService.getQuestionById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//}