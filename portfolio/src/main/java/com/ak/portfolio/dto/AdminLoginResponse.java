package com.ak.portfolio.dto;

public class AdminLoginResponse {

    private final String token;
    private final String tokenType;
    private final long expiresIn;
    private final String email;

    public AdminLoginResponse(
            String token,
            String tokenType,
            long expiresIn,
            String email) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public String getEmail() {
        return email;
    }
}