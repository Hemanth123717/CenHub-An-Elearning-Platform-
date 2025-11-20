package com.cencode.CenCode.entity;

import com.cencode.CenCode.util.TestGeneratorUtil;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String mailId;
    @Column(nullable = false)
    private String password;
    //    @Id
    @Column(nullable = false, unique = true)
    private Long cenId;
    @Column(nullable = false, unique = true)
    private Long contactNo;

    private String emailOtp;

    private LocalDateTime emailOtpExpiry;

    @Column(nullable = false)
    private boolean otpVerified = false;
//    @Column(nullable = false)
//    @Column()
//    private Long javaOverallMarks;

    //    @Column(nullable = false)
    @Column()
    private String status;



    @Column
    private Integer aptitudeMcqTotalMarks;
    @Column
    private Integer dbmsMcqTotalMarks;
    @Column
    private Integer verbalMcqTotalMarks;
    @Column
    private Integer webdevelopmentMcqTotalMarks;
    @Column
    private Integer javaMcqTotalMarks;
//    @Column
//    private Integer javaCodingTotalMarks;
    @Column
    private Integer pythonMcqTotalMarks;
//    @Column
//    private Integer pythonCodingTotalMarks;
    @Column
    private Integer cppprogrammingMcqTotalMarks;
//    @Column
//    private Integer cppprogrammingCodingTotalMarks;
    @Column
    private Integer cprogrammingMcqTotalMarks;
//    @Column
//    private Integer cprogrammingCodingTotalMarks;
    @Column
    private Integer totalMarks;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Client mentor;

    @ElementCollection
    @CollectionTable(name = "coding_results", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> codingResults = new HashMap<>();

    @Column
    private Integer codingTotalMarks;


//    @Column
//    private Events dailyEvents;
//
//    @ElementCollection
//    @CollectionTable(name = "daily_events_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> dailyEventsMcqTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "daily_events_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> dailyEventsMcqTestResult = new HashMap<>();
//
//
//    @Column
//    private Events weeklyEvents;
//
//    @ElementCollection
//    @CollectionTable(name = "weekly_events_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> weeklyEventsMcqTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "weekly_events_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> weeklyEventsMcqTestResult = new HashMap<>();
//
//    @Column
//    private Events monthlyEvents;
//
//    @ElementCollection
//    @CollectionTable(name = "monthly_events_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> monthlyEventsMcqTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "monthly_events_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> monthlyEventsMcqTestResult = new HashMap<>();


//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "client_roles",
//            joinColumns = @JoinColumn(name = "client_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id")
//    )
//    private Set<Role> roles = new HashSet<>();


//    List<String> subjects = Arrays.asList("Java", "CProgramming, CppProgramming", "DBMS", "WebDevelopment", "Python");
//    @Embedded
//    private TestQuestionsData clientTestData;

//    Java

    @ElementCollection
    @CollectionTable(name = "java_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> javaMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "java_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> javaMcqTestResult = new HashMap<>();
//    @ElementCollection
////    @CollectionTable(name = "java_coding_test_questions", joinColumns = @JoinColumn(name = "clientId"))
////    private Map<Integer, List<Integer>> javaCodingTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "java_coding_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> javaCodingTestResult = new HashMap<>();

//    Python

    @ElementCollection
    @CollectionTable(name = "python_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> pythonMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "python_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> pythonMcqTestResult = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "python_coding_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> pythonCodingTestQuestions = new HashMap<>();
//
//    @ElementCollection
//    @CollectionTable(name = "python_coding_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> pythonCodingTestResult = new HashMap<>();

//    Aptitude

    @ElementCollection
    @CollectionTable(name = "aptitude_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> aptitudeMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "aptitude_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> aptitudeMcqTestResult = new HashMap<>();

//    Verbal

    @ElementCollection
    @CollectionTable(name = "verbal_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> verbalMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "verbal_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> verbalMcqTestResult = new HashMap<>();


//    C Programming

    @ElementCollection
    @CollectionTable(name = "cprogramming_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> cprogrammingMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "cprogramming_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> cprogrammingMcqTestResult = new HashMap<>();

//    @ElementCollection
//    @CollectionTable(name = "cprogramming_coding_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> cprogrammingCodingTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "cprogramming_coding_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> cprogrammingCodingTestResult = new HashMap<>();


//    C++ Programming

    @ElementCollection
    @CollectionTable(name = "cppprogramming_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> cppprogrammingMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "cppprogramming_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> cppprogrammingMcqTestResult = new HashMap<>();

//    @ElementCollection
//    @CollectionTable(name = "cppprogramming_coding_test_questions", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<Integer>> cppprogrammingCodingTestQuestions = new HashMap<>();
//    @ElementCollection
//    @CollectionTable(name = "cppprogramming_coding_test_result", joinColumns = @JoinColumn(name = "clientId"))
//    private Map<Integer, List<String>> cppprogrammingCodingTestResult = new HashMap<>();


//    Web Developement

    @ElementCollection
    @CollectionTable(name = "webdevelopment_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> webdevelopmentMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "webdevelopment_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> webdevelopmentMcqTestResult = new HashMap<>();


//    DBMS

    @ElementCollection
    @CollectionTable(name = "dbms_mcq_test_questions", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<Integer>> dbmsMcqTestQuestions = new HashMap<>();
    @ElementCollection
    @CollectionTable(name = "dbms_mcq_test_result", joinColumns = @JoinColumn(name = "clientId"))
    private Map<Integer, List<String>> dbmsMcqTestResult = new HashMap<>();


    @PrePersist
    void prePresist() {
        if (this.status == null) {
            this.status = "pending";
        }

        int totalTests = 30;
        int questionsPerTest = 15;
        int maxQuestionPool = 700;
        int codingTotalTests = 10;
        int codingQuestionsPerTest = 2;

        this.javaMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.javaMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);
//        this.javaCodingTestQuestions = TestGeneratorUtil.generateTestQuestions(codingTotalTests, codingQuestionsPerTest, maxQuestionPool);
//        this.javaCodingTestResult = TestGeneratorUtil.generateEmptyResults(codingTotalTests, codingQuestionsPerTest);

        this.pythonMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.pythonMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);
//        this.pythonCodingTestQuestions = TestGeneratorUtil.generateTestQuestions(codingTotalTests, codingQuestionsPerTest, maxQuestionPool);
//        this.pythonCodingTestResult = TestGeneratorUtil.generateEmptyResults(codingTotalTests, codingQuestionsPerTest);

        this.cppprogrammingMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.cppprogrammingMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);
//        this.cppprogrammingCodingTestQuestions = TestGeneratorUtil.generateTestQuestions(codingTotalTests, codingQuestionsPerTest, maxQuestionPool);
//        this.cppprogrammingCodingTestResult = TestGeneratorUtil.generateEmptyResults(codingTotalTests, codingQuestionsPerTest);

        this.cprogrammingMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.cprogrammingMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);
//        this.cprogrammingCodingTestQuestions = TestGeneratorUtil.generateTestQuestions(codingTotalTests, codingQuestionsPerTest, maxQuestionPool);
//        this.cprogrammingCodingTestResult = TestGeneratorUtil.generateEmptyResults(codingTotalTests, codingQuestionsPerTest);

        this.webdevelopmentMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.webdevelopmentMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);

        this.verbalMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.verbalMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);

        this.aptitudeMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.aptitudeMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);

        this.dbmsMcqTestQuestions = TestGeneratorUtil.generateTestQuestions(totalTests, questionsPerTest, maxQuestionPool);
        this.dbmsMcqTestResult = TestGeneratorUtil.generateEmptyResults(totalTests, questionsPerTest);

        this.aptitudeMcqTotalMarks = 0;
        this.dbmsMcqTotalMarks = 0;
        this.verbalMcqTotalMarks = 0;
        this.webdevelopmentMcqTotalMarks = 0;
        this.javaMcqTotalMarks = 0;
        this.pythonMcqTotalMarks = 0;
        this.cppprogrammingMcqTotalMarks = 0;
        this.cprogrammingMcqTotalMarks = 0;
        this.totalMarks = 0;


    }
}

//        if (this.clientTestData == null) {
//            this.clientTestData = new TestQuestionsData(subjects);
//            this.clientTestData.generateTestQuestions();
//        }

//        if (aptitudeTestQuestionsData == null) {
//            aptitudeTestQuestionsData = new TestQuestionsData();
//        }
//
//        if(cProgrammingTestQuestionsData == null){
//            cProgrammingTestQuestionsData = new TestQuestionsData();
//        }
//
//        if(cPPProgrammingTestQuestionData == null){
//            cPPProgrammingTestQuestionData = new TestQuestionsData();
//        }
//        if(javaProgrammingTestQuestionsData == null){
//            javaProgrammingTestQuestionsData = new TestQuestionsData();
//        }
//        if(webDevelopmentTestQuestionsData == null){
//            webDevelopmentTestQuestionsData = new TestQuestionsData();
//        }
//        if(pythonProgrammingTestQuestionsData == null){
//            pythonProgrammingTestQuestionsData = new TestQuestionsData();
//        }
//        if(dBMSTestQuestionsData == null){
//            dBMSTestQuestionsData = new TestQuestionsData();
//        }
//
//        // Generate test questions when a new user is added
//        aptitudeTestQuestionsData.generateTestQuestions();
//        cProgrammingTestQuestionsData.generateTestQuestions();
//        cPPProgrammingTestQuestionData.generateTestQuestions();
//        pythonProgrammingTestQuestionsData.generateTestQuestions();
//        javaProgrammingTestQuestionsData.generateTestQuestions();
//        webDevelopmentTestQuestionsData.generateTestQuestions();
//        dBMSTestQuestionsData.generateTestQuestions();

//    @PrePersist
//    public void prePersist() {
//        if (this.status == null) {
//            this.status = "pending";
//        }
//
//        // Generate subject test data and test result data
////        this.subjectTestData = SubjectTestData.generateDefaultSubjects();
////        this.subjectTestResultData = SubjectTestData.generateDefaultSubjects(); // same structure, results stored later
//        this.subjectTestData = SubjectTestData.generateDefaultSubjects();
//        this.subjectTestResultData = SubjectTestData.generateDefaultSubjects();
//    }


//    @PrePersist
//    public void prePersist() {
//        if (this.status == null) this.status = "pending";
//
//        // Example: Generate for Java, Python
//        String[] subjects = {"Java", "Python"};
//        String[] types = {"mcq", "coding"};
//
//        for (String sub : subjects) {
//            TestType testType = new TestType();
//            testType.setType(sub);
//
//            for (String t : types) {
//                TestSizeGenerator generator = new TestSizeGenerator();
//                generator.generateTests(3, 5); // 3 tests, 5 questions each
//
//                TestType testTypeEntity = new TestType();
//                testTypeEntity.setType(t);
//                testTypeEntity.getTestType().put("default", generator);
//
//                this.subjectTestData.getSubjects().put(sub + "-" + t, testTypeEntity);
//            }
//        }
//    }




    // Generate test questions for all subjects



//    ------------------------------------------------------------------------------------------------------------------
//
//    @Embedded
//    private TestQuestionsData aptitudeTestQuestionsData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData cProgrammingTestQuestionsData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData cPPProgrammingTestQuestionData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData javaProgrammingTestQuestionsData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData pythonProgrammingTestQuestionsData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData dBMSTestQuestionsData = new TestQuestionsData();
//
//    @Embedded
//    private TestQuestionsData webDevelopmentTestQuestionsData = new TestQuestionsData();

//    ------------------------------------------------------------------------------------------------------------------

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "subject_test_data_id")
//    private SubjectTestData subjectTestData;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "subject_test_result_id")
//    private SubjectTestData subjectTestResultData;

//    @Embedded
//    private SubjectTestData subjectTestData = SubjectTestData.generateDefaultSubjects();
//
//
//    @Embedded
//    private SubjectTestData subjectTestResultData = SubjectTestData.generateDefaultSubjects();

//    @Embedded
//    private SubjectTestData subjectTestData = SubjectTestData.generateDefaultSubjects();
//    @Embedded
//    private SubjectTestData subjectTestResultData = SubjectTestData.generateDefaultSubjects();


//    @ElementCollection
//    @CollectionTable(name = "java_easy_test_marks", joinColumns = @JoinColumn(name = "clientId"))
//    @MapKeyColumn(name = "java_easy_test_marks_key")
//    @Column(name = "Java_easy_marks")
//    private Map<String, Integer> javaEasyTestMarks = new HashMap<>();
//
//    @ElementCollection
//    @CollectionTable(name = "java_medium_marks", joinColumns = @JoinColumn(name = "clientId"))
//    @MapKeyColumn(name = "test_id")
//    @Column(name = "score")
//    private Map<String, Integer> javaMediumTestMarks = new HashMap<>();
//
//    @ElementCollection
//    @CollectionTable(name = "java_hard_marks", joinColumns = @JoinColumn(name = "clientId"))
//    @MapKeyColumn(name = "test_id")
//    @Column(name = "score")
//    private Map<String, Integer> javaHardTestMarks = new HashMap<>();
//


//}
