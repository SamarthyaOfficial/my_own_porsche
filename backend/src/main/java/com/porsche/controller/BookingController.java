package com.porsche.controller;

import com.porsche.model.Booking;
import com.porsche.model.User;
import com.porsche.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository bookingRepository;

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(@AuthenticationPrincipal User user) {
        List<Booking> bookings = bookingRepository.findByUserOrderByBookingDateDesc(user);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody BookingRequest request) {

        Booking booking = Booking.builder()
                .user(user)
                .type(request.type())
                .modelName(request.modelName())
                .location(request.location())
                .bookingDate(request.bookingDate())
                .notes(request.notes())
                .status(Booking.BookingStatus.PENDING)
                .build();

        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(booking);
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Map<String, String>> cancelBooking(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
    }

    record BookingRequest(
            Booking.BookingType type,
            String modelName,
            String location,
            LocalDate bookingDate,
            String notes
    ) {}
}
