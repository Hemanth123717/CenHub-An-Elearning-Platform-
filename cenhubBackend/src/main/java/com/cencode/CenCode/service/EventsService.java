package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.EventsDto;
import com.cencode.CenCode.entity.Events;

import java.util.Date;
import java.util.List;

public interface EventsService {
    List<EventsDto> findAllEvents();
    List<EventsDto> findEventsByStatus(String status);
    List<EventsDto> findEventsByCategory(String eventCategory);
    List<EventsDto> findEventsByStartDate(Date startDate);
    EventsDto updateEventStatus(EventsDto eventsDto, Long id);
    Boolean addEvents(EventsDto eventsDto);
    void updateEventStatuses();
}
