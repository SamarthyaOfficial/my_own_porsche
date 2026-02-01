package com.porsche.controller;

import com.porsche.dto.AuthRequest;
import com.porsche.dto.AuthResponse;
import com.porsche.model.User;
import com.porsche.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest.Register request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest.Login request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@Valid @RequestBody AuthRequest.GoogleAuth request) {
        // In a real implementation, you would verify the Google token
        // and extract user info from it. For now, this is a placeholder.
        // You would use Google's API to verify: https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123

        // Mock implementation - in production, decode the JWT credential from Google
        AuthResponse response = authService.processGoogleAuth(
                "google-user@example.com",
                "Google User",
                request.getCredential(),
                null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse.UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        AuthResponse.UserDto userDto = AuthResponse.UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .build();
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        // JWT tokens are stateless, so logout is handled client-side
        // by removing the token from storage
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
