package com.porsche.controller;

import com.porsche.model.DrivingSchoolEnrollment;
import com.porsche.repository.DrivingSchoolEnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/driving-school")
@CrossOrigin(origins = "*")
public class DrivingSchoolController {

    @Autowired
    private DrivingSchoolEnrollmentRepository enrollmentRepository;

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollInProgram(@RequestBody Map<String, String> request) {
        DrivingSchoolEnrollment enrollment = new DrivingSchoolEnrollment();
        enrollment.setProgramId(request.getOrDefault("programId", ""));
        enrollment.setProgramName(request.getOrDefault("programName", ""));
        enrollment.setUserName(request.getOrDefault("name", ""));
        enrollment.setUserEmail(request.getOrDefault("email", ""));
        enrollment.setUserPhone(request.getOrDefault("phone", ""));
        enrollment.setDrivingExperience(request.getOrDefault("experience", ""));
        enrollment.setPreferredDate(request.getOrDefault("preferredDate", ""));
        enrollment.setPreferredLocation(request.getOrDefault("location", ""));

        DrivingSchoolEnrollment saved = enrollmentRepository.save(enrollment);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Enrollment submitted successfully");
        response.put("enrollmentId", saved.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<DrivingSchoolEnrollment>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentRepository.findAll());
    }

    @GetMapping("/enrollments/user/{email}")
    public ResponseEntity<List<DrivingSchoolEnrollment>> getEnrollmentsByUser(@PathVariable String email) {
        return ResponseEntity.ok(enrollmentRepository.findByUserEmail(email));
    }
}
