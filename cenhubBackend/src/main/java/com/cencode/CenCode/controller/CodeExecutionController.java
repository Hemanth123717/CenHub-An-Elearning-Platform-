package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.SubmissionRequest;
import com.cencode.CenCode.entity.Client;
import com.cencode.CenCode.entity.CodingQuestion;
import com.cencode.CenCode.entity.Submission;
import com.cencode.CenCode.repository.ClientRepo;
import com.cencode.CenCode.repository.SubmissionRepository;
import com.cencode.CenCode.service.impl.CodeExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/run")
public class CodeExecutionController {

    @Autowired
    private CodeExecutionService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> runCode(@RequestBody Map<String, String> payload) {
        String language = payload.get("language");
        String code = payload.get("code");
        String input = payload.getOrDefault("input", "");
        return ResponseEntity.ok(service.executeCode(language, code, input));
    }

    @PostMapping("/test-cases/{id}")
    public ResponseEntity<List<Map<String, String>>> runTestCases(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String language = payload.get("language");
        String code = payload.get("code");
        return ResponseEntity.ok(service.runTestCases(id, language, code));
    }

    @Autowired
    private ClientRepo clientRepo;

    @PostMapping("submit")
    public Submission submitCode(@RequestBody SubmissionRequest request) {
        Client client = clientRepo.findByCenId(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        List<Map<String, String>> testcasesData = service.runTestCases(request.getQuestionId(), request.getLanguage(), request.getCode());

        double marks = 0.0;
        if (!testcasesData.isEmpty()) {
            long passed = testcasesData.stream()
                    .filter(tc -> "Pass".equalsIgnoreCase(tc.get("status")))
                    .count();
            marks = ((double) passed / testcasesData.size()) * 100.0;
        }

        Submission submission = new Submission();
        submission.setClient(client);
        submission.setQuestionId(request.getQuestionId());
        submission.setLanguage(request.getLanguage());
        submission.setCode(request.getCode());
        submission.setTimeTaken(request.getTimeTaken());
        submission.setMarks(marks);

        return submissionRepository.save(submission);
    }

//    @PostMapping("/test-cases/{id}")
//    public ResponseEntity<List<Map<String, String>>> runTestCases(@PathVariable Long id, @RequestBody Map<String, String> payload) {
//        String language = payload.get("language");
//        String code = payload.get("code");
//        return ResponseEntity.ok(service.runTestCases(id, language, code));
//    }


//    @PostMapping("submit/test-cases/{cenId}/{id}")
//    public ResponseEntity<List<Map<String, String>>> submitRunTestCases(@PathVariable Long cenId, @PathVariable Long id, @RequestBody Map<String, String> payload) {
//        String language = payload.get("language");
//        String code = payload.get("code");
////        service.runTestCases(id, language, code);
////        Optional<Client> optionalClient = clientRepo.findByCenId(cenId);
//////        service.runTestCases(id, language, code) (returns test cases like this  )
////        Client cLient = optionalClient.get();
////        client.setClodingResult(id, language, code, testcases, marksObtainedOutOfHundredBasedOnTheFailedAndPassedCases);
//        return ResponseEntity.ok(service.runTestCases(id, language, code));
//    }

    @Autowired
    private SubmissionRepository submissionRepository;

//    @PostMapping
//    public Submission submitCode(@RequestBody SubmissionRequest request) {
//        Client client = clientRepo.findById(request.getClientId())
//                .orElseThrow(() -> new RuntimeException("Client not found"));
//
//        // Run test cases
//        List<Map<String, String>> testcasesData = service.runTestCases(request.getQuestionId(), request.getLanguage(), request.getCode());
//
//        Submission submission = new Submission();
//        // Calculate marks
//        long total = testcasesData.size();
//        long passed = testcasesData.stream().filter(tc -> "Pass".equalsIgnoreCase(tc.get("status"))).count();
//        double marks = ((double) passed / total) * 100.0; // Or any scoring logic you want
//
//        submission.setMarks(marks);
//
//        // Save the submission first
////        submission = submissionRepository.save(submission);
//        submission.setClient(client);
//        submission.setQuestionId(request.getQuestionId());
//        submission.setLanguage(request.getLanguage());
//        submission.setCode(request.getCode());
//        submission.setTimeTaken(request.getTimeTaken());
////        submission.setMarks(request.getMarks());
//
//        return submissionRepository.save(submission);
//    }

//    @Autowired
//    private static CodingQuestionRepository codingQuestionRepository;
//
//    @PostMapping("submit/test-cases/{clientId}/{questionId}")
//    public ResponseEntity<List<Map<String, String>>> submitRunTestCases(
//            @PathVariable Long clientId,
//            @PathVariable Long questionId,
//            @RequestBody Map<String, String> payload) {
//
//        String language = payload.get("language");
//        String code = payload.get("code");
//
//        List<Map<String, String>> testCases = service.runTestCases(questionId, language, code);
//
//        long passed = testCases.stream().filter(tc -> "Pass".equalsIgnoreCase(tc.get("status"))).count();
//        int marks = (int) ((passed * 100.0) / testCases.size());
//
//        Optional<Client> clientOpt = clientRepo.findById(clientId);
//        Optional<CodingQuestion> questionOpt = codingQuestionRepository.findById(questionId);
//
//        if (clientOpt.isPresent() && questionOpt.isPresent()) {
//            Submission submission = new Submission();
//            submission.setClient(clientOpt.get());
//            submission.setQuestion(questionOpt.get());
//            submission.setLanguage(language);
//            submission.setCode(code);
//            submission.setMarks(marks);
//            submission.setTestCasesJson(new Gson().toJson(testCases));
//
//            submissionRepo.save(submission);
//        }
//
//        return ResponseEntity.ok(testCases);
//    }


    @GetMapping("/question/{id}")
    public ResponseEntity<CodingQuestion> findQuestionByID(@PathVariable Long id){
        CodingQuestion question = service.findQuestionById(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<CodingQuestion>> getAllQuestions() {
        return new ResponseEntity<>(service.getAllQuestions(), HttpStatus.OK);
    }
}
