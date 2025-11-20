//package com.cencode.CenCode.entity.allsubsmcq;
//
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//@Service
////@Transactional
//public class QuestionService {
//
//    @Autowired
//    private QuestionRepository questionRepository;
//
//    @Autowired
//    private TestRepository testRepository;
//
//    @Autowired
//    private SubjectRepository subjectRepository;
//
//    /**
//     * Save a list of questions (imported from Excel).
//     */
////    public void saveQuestions(List<QuestionDTO> questionDTOs) {
////        List<Question> questions = questionDTOs.stream().map(this::dtoToEntity).collect(Collectors.toList());
////        questionRepository.saveAll(questions);
////    }
//
//    public void saveQuestions(List<QuestionDTO> questionDTOs) {
//        // Extract distinct subjects from incoming questions
//        Set<String> incomingSubjects = questionDTOs.stream()
//                .map(QuestionDTO::getSubject)
//                .filter(Objects::nonNull)
//                .collect(Collectors.toSet());
//
//        // Get existing subjects from DB
//        List<Subject> existingSubjects = subjectRepository.findAllByNameIn(incomingSubjects);
//        Set<String> existingSubjectNames = existingSubjects.stream()
//                .map(Subject::getName)
//                .collect(Collectors.toSet());
//
//        // Find new subjects to add
//        incomingSubjects.removeAll(existingSubjectNames);
//
//        // Save new subjects
//        List<Subject> newSubjects = incomingSubjects.stream()
//                .map(name -> {
//                    Subject s = new Subject();
//                    s.setName(name);
//                    return s;
//                }).collect(Collectors.toList());
//
//        subjectRepository.saveAll(newSubjects);
//
//        // Now save all questions
//        List<Question> questions = questionDTOs.stream()
//                .map(this::dtoToEntity)
//                .collect(Collectors.toList());
//
//        questionRepository.saveAll(questions);
//    }
//
//
//    private Question dtoToEntity(QuestionDTO dto) {
//        Question q = new Question();
//        q.setQuestion(dto.getQuestion());
//        q.setOption1(dto.getOption1());
//        q.setOption2(dto.getOption2());
//        q.setOption3(dto.getOption3());
//        q.setOption4(dto.getOption4());
//        q.setCorrectOption(dto.getCorrectOption());
//        q.setExplanation(dto.getExplanation());
//        q.setSubject(dto.getSubject());
//        q.setSubjectCode(dto.getSubjectCode());
//        q.setTopic(dto.getTopic());
//        q.setStatus(dto.getStatus() == null ? "active" : dto.getStatus());
//        return q;
//    }
//
//    /**
//     * Get all subjects and their topics.
//     */
////    public List<SubjectTopicsDTO> getAllSubjectsWithTopics() {
////        List<Subject> subjects = subjectRepository.findAll();
////        List<SubjectTopicsDTO> result = new ArrayList<>();
////
////        for (Subject subject : subjects) {
////            List<String> topics = questionRepository.findDistinctTopicBySubject(subject.getName());
////            SubjectTopicsDTO dto = new SubjectTopicsDTO();
////            dto.setSubjectName(subject.getName());
////            dto.setTopics(new HashSet<>(topics));
////            result.add(dto);
////        }
////        return result;
////    }
//
//    public List<SubjectTopicsDTO> getAllSubjectsWithTopics() {
//        List<Subject> subjects = subjectRepository.findAll();
//        System.out.println("Subjects found: " + subjects.size());
//
//        List<SubjectTopicsDTO> result = new ArrayList<>();
//
//        for (Subject subject : subjects) {
//            System.out.println("Fetching topics for subject: " + subject.getName());
//
//            List<String> topics = questionRepository.findDistinctTopicBySubject(subject.getName());
//            System.out.println("Topics found: " + topics);
//
//            SubjectTopicsDTO dto = new SubjectTopicsDTO();
//            dto.setSubjectName(subject.getName());
//            dto.setTopics(new HashSet<>(topics));
//            result.add(dto);
//        }
//        return result;
//    }
//
//
//    /**
//     * Generate topic-wise tests for a given subject.
//     * Tests are only generated for new topics (not already tested).
//     * Returns all tests for the subject including old ones.
//     */
//    public List<TestResultDTO> generateOrGetTestsForSubject(String subject, int questionsPerTopic) {
//
//        List<TestEntity> existingTests = testRepository.findBySubject(subject);
//        Set<String> testedTopics = existingTests.stream()
//                .map(TestEntity::getTopic)
//                .collect(Collectors.toSet());
//
//        List<Question> allSubjectQuestions = questionRepository.findBySubjectAndStatus(subject, "active");
//
//        // Group by topic
//        Map<String, List<Question>> questionsByTopic = allSubjectQuestions.stream()
//                .collect(Collectors.groupingBy(Question::getTopic));
//
//        // Find topics that are new (not tested yet)
//        Set<String> newTopics = new HashSet<>(questionsByTopic.keySet());
//        newTopics.removeAll(testedTopics);
//
//        // Generate tests for new topics
//        for (String newTopic : newTopics) {
//            List<Question> questions = questionsByTopic.get(newTopic);
//            Collections.shuffle(questions);
//
//            List<Long> selectedIds = questions.stream()
//                    .limit(questionsPerTopic)
//                    .map(Question::getId)
//                    .collect(Collectors.toList());
//
//            TestEntity newTest = new TestEntity();
//            newTest.setSubject(subject);
//            newTest.setTopic(newTopic);
//            newTest.setQuestionIds(selectedIds);
//
//            testRepository.save(newTest);
//            existingTests.add(newTest);
//        }
//
//        // Convert to DTOs and return
//        return existingTests.stream()
//                .map(test -> {
//                    TestResultDTO dto = new TestResultDTO();
//                    dto.setTopic(test.getTopic());
//                    dto.setQuestionIds(test.getQuestionIds());
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Get question by ID
//     */
//    public Optional<QuestionDTO> getQuestionById(Long id) {
//        return questionRepository.findById(id)
//                .map(this::entityToDTO);
//    }
//
//    private QuestionDTO entityToDTO(Question entity) {
//        QuestionDTO dto = new QuestionDTO();
//        dto.setQuestion(entity.getQuestion());
//        dto.setOption1(entity.getOption1());
//        dto.setOption2(entity.getOption2());
//        dto.setOption3(entity.getOption3());
//        dto.setOption4(entity.getOption4());
//        dto.setCorrectOption(entity.getCorrectOption());
//        dto.setExplanation(entity.getExplanation());
//        dto.setSubject(entity.getSubject());
//        dto.setSubjectCode(entity.getSubjectCode());
//        dto.setTopic(entity.getTopic());
//        dto.setStatus(entity.getStatus());
//        return dto;
//    }
//}
