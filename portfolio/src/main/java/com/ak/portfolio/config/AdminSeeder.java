package com.ak.portfolio.config;

import com.ak.portfolio.entity.Admin;
import com.ak.portfolio.repositery.AdminRepo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepo adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    private String role="ADMIN";

    public AdminSeeder(
            AdminRepo adminRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminEmail.isBlank() || adminPassword.isBlank()) {
            System.out.println(
                    "Admin not seeded. Configure ADMIN_EMAIL and ADMIN_PASSWORD."
            );
            return;
        }

        if (adminPassword.length() < 12) {
            throw new IllegalStateException(
                    "ADMIN_PASSWORD must contain at least 12 characters."
            );
        }

        String email = adminEmail.trim();

        if (adminRepository.findByEmail(email).isEmpty()) {
            Admin admin = new Admin(
                    email,
                    passwordEncoder.encode(adminPassword),
                    role
                    
                    
            );

            adminRepository.save(admin);
            System.out.println("Initial admin account created.");
        } else {
            System.out.println("Admin account already exists.");
        }
    }
}