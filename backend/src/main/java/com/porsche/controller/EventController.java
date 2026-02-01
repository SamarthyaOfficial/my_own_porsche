package com.porsche.controller;

import com.porsche.model.EventRegistration;
import com.porsche.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerForEvent(@RequestBody Map<String, String> request) {
        EventRegistration registration = new EventRegistration();
        registration.setEventId(request.getOrDefault("eventId", ""));
        registration.setEventName(request.getOrDefault("eventName", ""));
        registration.setEventDate(request.getOrDefault("eventDate", ""));
        registration.setEventLocation(request.getOrDefault("eventLocation", request.getOrDefault("location", "")));
        registration.setEventPrice(request.getOrDefault("eventPrice", ""));
        registration.setUserName(request.getOrDefault("name", ""));
        registration.setUserEmail(request.getOrDefault("email", ""));
        registration.setUserPhone(request.getOrDefault("phone", ""));
        registration.setDrivingExperience(request.getOrDefault("experience", ""));
        registration.setPreferredDate(request.getOrDefault("preferredDate", ""));
        registration.setPreferredLocation(request.getOrDefault("preferredLocation", ""));

        EventRegistration saved = eventRegistrationRepository.save(registration);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration successful");
        response.put("registrationId", saved.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EventRegistration>> getAllRegistrations() {
        return ResponseEntity.ok(eventRegistrationRepository.findAll());
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<EventRegistration>> getRegistrationsByUser(@PathVariable String email) {
        return ResponseEntity.ok(eventRegistrationRepository.findByUserEmail(email));
    }
}
