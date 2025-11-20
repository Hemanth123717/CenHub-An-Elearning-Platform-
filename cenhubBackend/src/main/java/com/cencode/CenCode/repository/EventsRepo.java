package com.cencode.CenCode.repository;

import com.cencode.CenCode.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventsRepo extends JpaRepository<Events, Long> {
    List<Events> findByStatus(String status);
    List<Events> findByEventCategory(String eventCategory);
    List<Events> findByStartDate(Date startDate);
}
