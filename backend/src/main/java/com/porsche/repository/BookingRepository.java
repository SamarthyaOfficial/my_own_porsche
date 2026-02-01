package com.porsche.repository;

import com.porsche.model.Booking;
import com.porsche.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserOrderByBookingDateDesc(User user);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByUserAndStatus(User user, Booking.BookingStatus status);
}
