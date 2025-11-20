//package com.cencode.CenCode.entity.allsubsmcq;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface QuestionRepository extends JpaRepository<Question, Long> {
//
//    List<Question> findBySubjectAndStatus(String subject, String status);
//
//    List<Question> findBySubjectAndTopicAndStatus(String subject, String topic, String status);
//
//    List<Question> findBySubject(String subject);
//
//    List<String> findDistinctTopicBySubject(String subject);
//
//}
//
