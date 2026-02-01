package com.porsche.controller;

import com.porsche.model.TravelInquiry;
import com.porsche.repository.TravelInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "*")
public class TravelController {

    @Autowired
    private TravelInquiryRepository travelInquiryRepository;

    @PostMapping("/inquiry")
    public ResponseEntity<?> submitTravelInquiry(@RequestBody Map<String, String> request) {
        TravelInquiry inquiry = new TravelInquiry();
        inquiry.setDestinationId(request.getOrDefault("destinationId", ""));
        inquiry.setDestinationName(request.getOrDefault("destinationName", ""));
        inquiry.setUserName(request.getOrDefault("name", ""));
        inquiry.setUserEmail(request.getOrDefault("email", ""));
        inquiry.setUserPhone(request.getOrDefault("phone", ""));
        inquiry.setNumberOfGuests(request.getOrDefault("guests", ""));
        inquiry.setPreferredDate(request.getOrDefault("preferredDate", ""));
        inquiry.setMessage(request.getOrDefault("message", ""));

        TravelInquiry saved = travelInquiryRepository.save(inquiry);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Inquiry submitted successfully");
        response.put("inquiryId", saved.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/inquiries")
    public ResponseEntity<List<TravelInquiry>> getAllInquiries() {
        return ResponseEntity.ok(travelInquiryRepository.findAll());
    }

    @GetMapping("/inquiries/user/{email}")
    public ResponseEntity<List<TravelInquiry>> getInquiriesByUser(@PathVariable String email) {
        return ResponseEntity.ok(travelInquiryRepository.findByUserEmail(email));
    }
}
