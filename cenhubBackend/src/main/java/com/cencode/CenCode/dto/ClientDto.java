package com.cencode.CenCode.dto;

//import com.cencode.CenCode.entity.SubjectTestData;
//import com.cencode.CenCode.entity.TestQuestionsData;
//import com.cencode.CenCode.entity.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Data
public class ClientDto {
    private Long ClientId;
    private String name;
    private String mailId;
    private String password;
    private Long cenId;
    private Long contactNo;
    private Integer aptitudeMcqTotalMarks;
    private Integer dbmsMcqTotalMarks;
    private Integer verbalMcqTotalMarks;
    private Integer webdevelopmentMcqTotalMarks;
    private Integer javaMcqTotalMarks;
    private Integer javaCodingTotalMarks;
    private Integer pythonMcqTotalMarks;
    private Integer pythonCodingTotalMarks;
    private Integer cppprogrammingMcqTotalMarks;
    private Integer cppprogrammingCodingTotalMarks;
    private Integer cprogrammingMcqTotalMarks;
    private Integer cprogrammingCodingTotalMarks;
    private Integer TotalMarks;
    private String role;
//    private Long mentorId;
    private Map<Integer, List<Integer>> javaMcqTestQuestions;
//    private Map<Integer, List<Integer>> javaCodingTestQuestions;
    private Map<Integer, List<String>> javaMcqTestResult;
//    private Map<Integer, List<String>> javaCodingTestResult;
    private Map<Integer, List<Integer>> pythonMcqTestQuestions;
//    private Map<Integer, List<Integer>> pythonCodingTestQuestions;
    private Map<Integer, List<String>> pythonMcqTestResult;
//    private Map<Integer, List<String>> pythonCodingTestResult;
    private Map<Integer, List<Integer>> aptitudeMcqTestQuestions;
    private Map<Integer, List<String>> aptitudeMcqTestResult;
    private Map<Integer, List<Integer>> verbalMcqTestQuestions;
    private Map<Integer, List<String>> verbalMcqTestResult;
    private Map<Integer, List<Integer>> cprogrammingMcqTestQuestions;
//    private Map<Integer, List<Integer>> cprogrammingCodingTestQuestions;
    private Map<Integer, List<String>> cprogrammingMcqTestResult;
//    private Map<Integer, List<String>> cprogrammingCodingTestResult;
    private Map<Integer, List<Integer>> cppprogrammingMcqTestQuestions;
//    private Map<Integer, List<Integer>> cppprogrammingCodingTestQuestions;
    private Map<Integer, List<String>> cppprogrammingMcqTestResult;
//    private Map<Integer, List<String>> cppprogrammingCodingTestResult;
    private Map<Integer, List<Integer>> webdevelopmentMcqTestQuestions;
    private Map<Integer, List<String>> webdevelopmentMcqTestResult;
    private Map<Integer, List<Integer>> dbmsMcqTestQuestions;
    private Map<Integer, List<String>> dbmsMcqTestResult;
    private String status;

//    private Long javaOverallMarks;
//    private Map<Integer, List<Integer>> javaTestQuestions;
//    private Map<Integer, List<String>> javaTestResults;
//
//    private Map<Integer, List<Integer>> pythonTestQuestions;
//    private Map<Integer, List<String>> pythonTestResults;
//    private Map<String, Integer> javaEasyTestMarks;
//    private Map<String, Integer> javaMediumTestMarks;
//    private Map<String, Integer> javaHardTestMarks;
//    private TestQuestionsData aptitudeTestQuestionsData;
//    private TestQuestionsData cProgrammingTestQuestionsData;
//    private TestQuestionsData cPPProgrammingTestQuestionData;
//    private TestQuestionsData javaProgrammingTestQuestionsData;
//    private TestQuestionsData pythonProgrammingTestQuestionsData;
//    private TestQuestionsData dBMSTestQuestionsData;
//    private TestQuestionsData webDevelopmentTestQuestionsData;
//    private TestQuestionsData clientTestData;
//    private TestQuestionsData javaTestData;
//    private TestQuestionsData pythonTestData;
//    private SubjectTestData subjectTestData;
//    private SubjectTestData subjectTestResultData;
}
