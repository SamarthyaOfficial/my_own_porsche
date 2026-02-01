package com.porsche.repository;

import com.porsche.model.DrivingSchoolEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DrivingSchoolEnrollmentRepository extends JpaRepository<DrivingSchoolEnrollment, Long> {
    List<DrivingSchoolEnrollment> findByUserEmail(String userEmail);
    List<DrivingSchoolEnrollment> findByProgramId(String programId);
}
