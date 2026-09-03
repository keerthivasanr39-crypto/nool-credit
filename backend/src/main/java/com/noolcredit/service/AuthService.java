package com.noolcredit.service;

import com.noolcredit.dto.AuthDtos.*;
import com.noolcredit.entity.Msme;
import com.noolcredit.entity.Role;
import com.noolcredit.entity.User;
import com.noolcredit.exception.BadRequestException;
import com.noolcredit.repository.MsmeRepository;
import com.noolcredit.repository.UserRepository;
import com.noolcredit.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final MsmeRepository msmeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address already registered: " + request.getEmail());
        }

        Role role = Role.ROLE_MSME;
        if (request.getRole() != null && request.getRole().toUpperCase().contains("LENDER")) {
            role = Role.ROLE_LENDER;
        }

        String userId = "usr-" + UUID.randomUUID().toString().substring(0, 8);
        User user = User.builder()
                .id(userId)
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        String businessName = request.getBusinessName();
        String industry = request.getIndustry();

        if (role == Role.ROLE_MSME) {
            Msme msme = Msme.builder()
                    .id("msme-" + UUID.randomUUID().toString().substring(0, 8))
                    .userId(userId)
                    .businessName(businessName != null ? businessName : "Job Work Enterprise")
                    .industry(industry != null ? industry : "Textile Job Work")
                    .location(request.getLocation() != null ? request.getLocation() : "Tirupur, Tamil Nadu")
                    .build();
            msmeRepository.save(msme);
        }

        String token = tokenProvider.generateTokenFromUsername(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .businessName(businessName != null ? businessName : (role == Role.ROLE_LENDER ? "Apex Capital Partners" : "Sri Lakshmi Knits"))
                .industry(industry != null ? industry : (role == Role.ROLE_LENDER ? "Institutional NBFC" : "Textile Job Work"))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        String businessName = user.getRole() == Role.ROLE_LENDER ? "Apex Capital Partners" : "Sri Lakshmi Knits";
        String industry = user.getRole() == Role.ROLE_LENDER ? "Institutional NBFC" : "Textile Job Work";

        if (user.getRole() == Role.ROLE_MSME) {
            msmeRepository.findByUserId(user.getId()).ifPresent(msme -> {
                // Use entity values
            });
        }

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .businessName(businessName)
                .industry(industry)
                .build();
    }
}
