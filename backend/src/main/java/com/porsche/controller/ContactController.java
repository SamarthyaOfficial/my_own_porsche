package com.porsche.controller;

import com.porsche.model.ContactSubmission;
import com.porsche.repository.ContactSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactSubmissionRepository contactSubmissionRepository;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody Map<String, String> request) {
        ContactSubmission submission = new ContactSubmission();
        submission.setName(request.getOrDefault("name", ""));
        submission.setEmail(request.getOrDefault("email", ""));
        submission.setSubject(request.getOrDefault("subject", ""));
        submission.setMessage(request.getOrDefault("message", ""));

        ContactSubmission saved = contactSubmissionRepository.save(submission);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Message sent successfully");
        response.put("submissionId", saved.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ContactSubmission>> getAllSubmissions() {
        return ResponseEntity.ok(contactSubmissionRepository.findAll());
    }
}
