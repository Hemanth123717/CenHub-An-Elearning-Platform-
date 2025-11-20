package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.EventsDto;
import com.cencode.CenCode.entity.Events;
import com.cencode.CenCode.mapper.EventsMapper;
import com.cencode.CenCode.repository.EventsRepo;
import com.cencode.CenCode.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventsServiceImpl implements EventsService {
    @Autowired
    private EventsRepo eventsRepo;


    @Override
    public List<EventsDto> findAllEvents() {
        List<Events> events = eventsRepo.findAll();
        return events.stream().map(EventsMapper::mapToEventsDto).collect(Collectors.toList());
    }

    @Override
    public List<EventsDto> findEventsByStatus(String status) {
        List<Events> events = eventsRepo.findByEventCategory(status);
        return events.stream().map(EventsMapper::mapToEventsDto).collect(Collectors.toList());
    }

    @Override
    public List<EventsDto> findEventsByCategory(String eventCategory) {
        List<Events> events = eventsRepo.findByEventCategory(eventCategory);
        return events.stream().map(EventsMapper::mapToEventsDto).collect(Collectors.toList());
    }

    @Override
    public List<EventsDto> findEventsByStartDate(Date startDate) {
        List<Events> events = eventsRepo.findByStartDate(startDate);
        return events.stream().map(EventsMapper::mapToEventsDto).collect(Collectors.toList());
    }

    @Override
    public EventsDto updateEventStatus(EventsDto eventsDto, Long id) {
        Optional<Events> optionalEvents = eventsRepo.findById(id);
        Events events = optionalEvents.get();
        updateEventsDtoToEvents(events, eventsDto);
        return null;
    }

    @Override
    public Boolean addEvents(EventsDto eventsDto) {
        Date now = new Date();
        Date start = eventsDto.getStartDate();

        if (isSameDay(start, now)) {
            eventsDto.setStatus("Ongoing");
        } else if (start.before(now)) {
            eventsDto.setStatus("Completed");
        } else {
            eventsDto.setStatus("Upcoming");
        }
        Events events = EventsMapper.mapToEvents(eventsDto);
        Events newEvents = eventsRepo.save(events);
        return newEvents!=null;
    }

    private boolean isSameDay(Date date1, Date date2) {
            Calendar cal1 = Calendar.getInstance();
            Calendar cal2 = Calendar.getInstance();
            cal1.setTime(date1);
            cal2.setTime(date2);

            return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
                    cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR);
        }



    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void updateEventStatuses() {
        List<Events> events = eventsRepo.findAll();
        Date now = new Date();

        for (Events event : events) {
            Date start = event.getStartDate();

            if (isSameDay(start, now)) {
                event.setStatus("Ongoing");
            } else if (start.before(now)) {
                event.setStatus("Completed");
            } else {
                event.setStatus("Upcoming");
            }
        }

        eventsRepo.saveAll(events);
        System.out.println("Event statuses updated at: " + now);
    }

    private void updateEventsDtoToEvents(Events events, EventsDto eventsDto){
        if(eventsDto.getId() != null){
            events.setId(eventsDto.getId());
        }
        if(eventsDto.getName() != null){
            events.setName(eventsDto.getName());
        }
        if(eventsDto.getStatus() != null){
            events.setStatus(eventsDto.getStatus());
        }
        if(eventsDto.getUrl() != null){
            events.setUrl(eventsDto.getUrl());
        }
        if(eventsDto.getEventCategory() != null){
            events.setEventCategory(eventsDto.getEventCategory());
        }
        if(eventsDto.getStartDate() != null){
            events.setStartDate(eventsDto.getStartDate());
        }
//        if(eventsDto.getEndDate() != null){
//            events.setEndDate(eventsDto.getEndDate());
//        }
    }
}
