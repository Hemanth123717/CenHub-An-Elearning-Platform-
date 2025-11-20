package com.cencode.CenCode.emdededSubjects;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;

import java.util.List;
import java.util.Map;

//@Embeddable
//public class JavaTestData {
//    private Map<Integer, List<Integer>> mcqQuestions;
//    private Map<Integer, List<String>> mcqResults;
//    private Map<Integer, List<Integer>> codingQuestions;
//    private Map<Integer, List<String>> codingResults;
//}


@Embeddable
public class JavaTestData {

    @Lob
    private String mcqQuestionsJson;

    @Lob
    private String mcqResultsJson;

    @Lob
    private String codingQuestionsJson;

    @Lob
    private String codingResultsJson;

    // Use a JSON library like Jackson to convert your maps to/from strings.
}
