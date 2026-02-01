package com.porsche.controller;

import com.porsche.model.SavedCard;
import com.porsche.model.User;
import com.porsche.repository.SavedCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final SavedCardRepository savedCardRepository;

    @GetMapping("/cards")
    public ResponseEntity<List<SavedCard>> getCards(@AuthenticationPrincipal User user) {
        List<SavedCard> cards = savedCardRepository.findByUserOrderByCreatedAtDesc(user);
        return ResponseEntity.ok(cards);
    }

    @PostMapping("/cards")
    public ResponseEntity<SavedCard> addCard(
            @AuthenticationPrincipal User user,
            @RequestBody CardRequest request) {

        SavedCard card = SavedCard.builder()
                .user(user)
                .brand(request.brand())
                .lastFour(request.lastFour())
                .expiryMonth(request.expiryMonth())
                .expiryYear(request.expiryYear())
                .cardholderName(request.cardholderName())
                .isDefault(request.isDefault())
                .build();

        SavedCard saved = savedCardRepository.save(card);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<Map<String, String>> deleteCard(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        SavedCard card = savedCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        if (!card.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }

        savedCardRepository.delete(card);
        return ResponseEntity.ok(Map.of("message", "Card deleted successfully"));
    }

    record CardRequest(
            String brand,
            String lastFour,
            Integer expiryMonth,
            Integer expiryYear,
            String cardholderName,
            Boolean isDefault
    ) {}
}
