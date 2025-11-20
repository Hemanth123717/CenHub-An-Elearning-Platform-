//package com.cencode.CenCode.entity.allsubsmcq;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//import java.util.Set;
//
//public interface TestRepository extends JpaRepository<TestEntity, Long> {
//
//    @Query("SELECT DISTINCT t.topic FROM TestEntity t WHERE t.subject = :subject")
//    Set<String> findTestedTopicsBySubject(@Param("subject") String subject);
//
//    List<TestEntity> findBySubject(String subject);
//
//    List<TestEntity> findBySubjectAndTopic(String subject, String topic);
//}
