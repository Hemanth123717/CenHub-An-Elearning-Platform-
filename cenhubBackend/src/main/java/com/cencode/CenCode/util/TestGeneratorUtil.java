package com.cencode.CenCode.util;
//
//import java.util.*;
//
//public class TestGeneratorUtil {
//
//    public static Map<Integer, List<Integer>> generateTestQuestions(int totalTests, int questionsPerTest, int maxQuestionPool) {
//        Random random = new Random();
//        Set<Integer> usedQuestions = new HashSet<>();
//        Map<Integer, List<Integer>> testQuestionsMap = new HashMap<>();
//
//        for (int i = 1; i <= totalTests; i++) {
//            Set<Integer> questionSet = new HashSet<>();
//            while (questionSet.size() < questionsPerTest) {
//                int randomQ = random.nextInt(maxQuestionPool) + 1;
//                if (!usedQuestions.contains(randomQ)) {
//                    questionSet.add(randomQ);
//                    usedQuestions.add(randomQ);
//                }
//            }
//            testQuestionsMap.put(i, new ArrayList<>(questionSet));
//        }
//
//        return testQuestionsMap;
//    }
//
//    public static Map<Integer, List<String>> generateEmptyResults(int totalTests) {
//        Map<Integer, List<String>> resultMap = new HashMap<>();
//        for (int i = 1; i <= totalTests; i++) {
//            resultMap.put(i, new ArrayList<>());
//        }
//        return resultMap;
//    }
//}


import java.awt.*;
import java.util.*;
import java.util.List;

public class TestGeneratorUtil {

    public static Map<Integer, List<Integer>> generateTestQuestions(int totalTests, int questionsPerTest, int maxQuestionPool) {
        Random random = new Random();
        Set<Integer> usedQuestions = new HashSet<>();
        Map<Integer, List<Integer>> testQuestionsMap = new HashMap<>();

        for (int i = 1; i <= totalTests; i++) {
            Set<Integer> questionSet = new HashSet<>();
            while (questionSet.size() < questionsPerTest) {
                int randomQ = random.nextInt(maxQuestionPool) + 1;
                if (!usedQuestions.contains(randomQ)) {
                    questionSet.add(randomQ);
                    usedQuestions.add(randomQ);
                }
            }
            testQuestionsMap.put(i, new ArrayList<>(questionSet));
        }

        return testQuestionsMap;
    }

    public static Map<Integer, List<String>> generateEmptyResults(int totalTests, int questionsPerTest) {
        Map<Integer, List<String>> resultMap = new HashMap<>();
        for (int i = 1; i <= totalTests; i++) {
//            List<String> results = new ArrayList<>(Collections.nCopies(questionsPerTest, ""));
            List<String> results = new ArrayList<>();
            resultMap.put(i, results);
//            System.out.println(i+" Results");
        }
        return resultMap;
    }
}
