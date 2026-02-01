package com.porsche.repository;

import com.porsche.model.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByUserEmail(String userEmail);
    List<EventRegistration> findByEventId(String eventId);
}
