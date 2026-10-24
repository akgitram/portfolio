package com.ak.portfolio.controller;

import com.ak.portfolio.dto.AdminLoginRequest;
import com.ak.portfolio.dto.AdminLoginResponse;
import com.ak.portfolio.service.AdminAuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public AdminAuthController(AdminAuthService adminAuthService) {
        this.adminAuthService = adminAuthService;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request) {
        System.out.println("Admin login reach");
        return ResponseEntity.ok(adminAuthService.login(request));
    }
}