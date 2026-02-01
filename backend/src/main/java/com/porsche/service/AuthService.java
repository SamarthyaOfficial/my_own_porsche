package com.porsche.service;

import com.porsche.dto.AuthRequest;
import com.porsche.dto.AuthResponse;
import com.porsche.model.User;
import com.porsche.repository.UserRepository;
import com.porsche.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(AuthRequest.Register request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail());

        return buildAuthResponse(token, user);
    }

    public AuthResponse login(AuthRequest.Login request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();
        String token = tokenProvider.generateToken(authentication);

        return buildAuthResponse(token, user);
    }

    public AuthResponse processGoogleAuth(String email, String name, String googleId, String profileImage) {
        User user = userRepository.findByGoogleId(googleId)
                .orElseGet(() -> userRepository.findByEmail(email)
                        .map(existingUser -> {
                            existingUser.setGoogleId(googleId);
                            if (profileImage != null) {
                                existingUser.setProfileImage(profileImage);
                            }
                            return userRepository.save(existingUser);
                        })
                        .orElseGet(() -> {
                            User newUser = User.builder()
                                    .name(name)
                                    .email(email)
                                    .googleId(googleId)
                                    .profileImage(profileImage)
                                    .role(User.Role.USER)
                                    .build();
                            return userRepository.save(newUser);
                        }));

        String token = tokenProvider.generateToken(user.getEmail());

        return buildAuthResponse(token, user);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(AuthResponse.UserDto.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .profileImage(user.getProfileImage())
                        .build())
                .build();
    }
}
