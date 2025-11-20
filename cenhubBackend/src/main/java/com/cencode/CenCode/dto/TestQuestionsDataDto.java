package com.cencode.CenCode.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TestQuestionsDataDto {

    private Map<String, SubjectTestDataDto> subjectData;

    @Data
    public static class SubjectTestDataDto {
        private String subject;
        private Map<Integer, List<Integer>> testMcqQuestions;
        private Map<Integer, List<Integer>> testCodingQuestions;
        private Map<Integer, List<String>> testMcqResults;
        private Map<Integer, List<String>> testCodingResults;
    }
}
