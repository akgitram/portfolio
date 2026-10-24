package com.ak.portfolio.service;

import com.ak.portfolio.dto.AdminLoginRequest;
import com.ak.portfolio.dto.AdminLoginResponse;
import com.ak.portfolio.entity.Admin;
import com.ak.portfolio.repositery.AdminRepo;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminAuthService {

    private final AdminRepo adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminAuthService(
            AdminRepo adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AdminLoginResponse login(AdminLoginRequest request) {

        Admin admin = adminRepository
                .findByEmail(request.getEmail().trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPasswordHash())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(admin.getEmail(),admin.getRole());

        return new AdminLoginResponse(
                token,
                "Bearer",
                jwtService.getExpirationSeconds(),
                admin.getEmail()
        );
    }
}