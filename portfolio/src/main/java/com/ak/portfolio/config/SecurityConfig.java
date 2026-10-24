package com.ak.portfolio.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

import java.util.HexFormat;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // JWT signing key
    @Bean
    public SecretKey jwtSecretKey(
            @Value("${jwt.secret}") String secretHex) {

        byte[] keyBytes = HexFormat.of().parseHex(secretHex);

        if (keyBytes.length < 32) {
            throw new IllegalStateException(
                    "JWT secret must contain at least 32 random bytes.");
        }

        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    @Bean
    public JwtEncoder jwtEncoder(SecretKey jwtSecretKey) {
        return new NimbusJwtEncoder(
                new ImmutableSecret<>(jwtSecretKey));
    }

    @Bean
    public JwtDecoder jwtDecoder(SecretKey jwtSecretKey) {
        return NimbusJwtDecoder
                .withSecretKey(jwtSecretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    // Read role claim from JWT
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            String role = jwt.getClaimAsString("role");

            if (role == null || role.isBlank()) {
                return List.of();
            }

            return List.of(
                    new SimpleGrantedAuthority("ROLE_" + role));
        });

        return converter;
    }

    // Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationConverter jwtAuthenticationConverter,
            @Qualifier("configurationSource")
            CorsConfigurationSource corsConfigurationSource)
            throws Exception {

        http
                // Explicitly connect CorsConfig
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource))

                .csrf(csrf -> csrf.disable())

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Allow browser CORS preflight requests
                        .requestMatchers(
                                HttpMethod.OPTIONS, "/**")
                        .permitAll()

                        // Public endpoints
                        .requestMatchers(
                                "/api/test",
                                "/api/admin/login")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/projects",
                                "/api/projects/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET, "/api/skills/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET, "/api/services/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET, "/api/experience/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET, "/api/certifications/**")
                        .permitAll()

                        .requestMatchers(HttpMethod.GET,"/api/educations/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.POST, "/api/contact/**")
                        .permitAll()

                        // Admin-only endpoints
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/projects", "/api/projects/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/projects", "/api/projects/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/projects", "/api/projects/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/projects", "/api/projects/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST, "/api/skills/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH, "/api/skills/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE, "/api/skills/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST, "/api/services/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH, "/api/services/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE, "/api/services/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST, "/api/experience/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH, "/api/experience/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE, "/api/experience/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST, "/api/certifications/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH, "/api/certifications/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE, "/api/certifications/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST, "/api/educations/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH, "/api/educations/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE, "/api/educations/**")
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET, "/api/contact/**")
                        .hasRole("ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated())

                // Validate incoming JWTs
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter)));

        return http.build();
    }
}