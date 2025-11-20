package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.EventsDto;
import com.cencode.CenCode.entity.Events;
import com.cencode.CenCode.service.EventsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/events")
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping("allevents")
    ResponseEntity<List<EventsDto>> findAllEvents(){
        List<EventsDto> events = eventsService.findAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("allevents/status/{status}")
    ResponseEntity<List<EventsDto>> findEventsByStatus(@PathVariable String status){
        List<EventsDto> events = eventsService.findEventsByStatus(status);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("allevents/category/{eventCategory}")
    ResponseEntity<List<EventsDto>> findEventsByCategory(@PathVariable String eventCategory){
        List<EventsDto> events = eventsService.findEventsByCategory(eventCategory);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("allevents/startDate/{startDate}")
    ResponseEntity<List<EventsDto>> findEventsByStartDate(@PathVariable Date startDate){
        List<EventsDto> events = eventsService.findEventsByStartDate(startDate);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PatchMapping("allevents/Update/{id}")
    ResponseEntity<EventsDto> updateEventStatus(@PathVariable Long id, @RequestBody EventsDto eventsDto){
        EventsDto events = eventsService.updateEventStatus(eventsDto, id);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PutMapping("addEvent")
    ResponseEntity<Boolean> addEvents(@RequestBody EventsDto eventsDto){
        Boolean added = eventsService.addEvents(eventsDto);
        return new ResponseEntity<>(added, HttpStatus.OK);
    }

}
