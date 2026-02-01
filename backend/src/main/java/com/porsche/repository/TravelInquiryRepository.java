package com.porsche.repository;

import com.porsche.model.TravelInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TravelInquiryRepository extends JpaRepository<TravelInquiry, Long> {
    List<TravelInquiry> findByUserEmail(String userEmail);
    List<TravelInquiry> findByDestinationId(String destinationId);
}
