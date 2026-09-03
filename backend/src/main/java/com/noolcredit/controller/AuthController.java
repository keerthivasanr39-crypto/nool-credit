package com.noolcredit.controller;

import com.noolcredit.dto.Dtos;
import com.noolcredit.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider jwtProvider;

    public AuthController(JwtTokenProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<Dtos.AuthResponse> login(@RequestBody Dtos.AuthRequest req) {
        String role = req.getRole() != null ? req.getRole() : "MSME";
        String token = jwtProvider.generateToken(req.getEmail(), role);
        String name = role.equals("LENDER") ? "Priya Narayanan" : "Karthik Subramanian";
        String businessName = role.equals("LENDER") ? "Apex FinCorp Capital" : "Sri Lakshmi Knits";
        String userId = role.equals("LENDER") ? "user-lender-1" : "user-msme-1";

        return ResponseEntity.ok(new Dtos.AuthResponse(token, userId, name, req.getEmail(), role, businessName));
    }

    @PostMapping("/register")
    public ResponseEntity<Dtos.AuthResponse> register(@RequestBody Dtos.AuthRequest req) {
        return login(req);
    }
}
