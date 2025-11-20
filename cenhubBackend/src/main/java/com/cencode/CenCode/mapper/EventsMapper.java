package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.EventsDto;
import com.cencode.CenCode.entity.Events;
import jdk.jfr.Event;

public class EventsMapper {
    public static EventsDto mapToEventsDto(Events events){
        EventsDto eventsDto = new EventsDto();
        eventsDto.setId(events.getId());
        eventsDto.setEventCategory(events.getEventCategory());
        eventsDto.setName(events.getName());
        eventsDto.setStatus(events.getStatus());
        eventsDto.setUrl(events.getUrl());
//        eventsDto.setEndDate(events.getEndDate());
        eventsDto.setStartDate(events.getStartDate());
        return eventsDto;
    }

    public static Events mapToEvents(EventsDto eventsDto){
        Events events = new Events();
        events.setId(eventsDto.getId());
        events.setEventCategory(eventsDto.getEventCategory());
        events.setName(eventsDto.getName());
        events.setStatus(eventsDto.getStatus());
        events.setUrl(eventsDto.getUrl());
//        events.setEndDate(eventsDto.getEndDate());
        events.setStartDate(eventsDto.getStartDate());
        return events;
    }
}
