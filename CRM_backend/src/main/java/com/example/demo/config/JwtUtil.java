package com.example.demo.config;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final String SECRET =
            "RealEstateCRMSecretKeyRealEstateCRMSecretKey";

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24;

    private Key getKey() {

        return new SecretKeySpec(
                SECRET.getBytes(),
                SignatureAlgorithm.HS256.getJcaName()
        );
    }

    public String generateToken(
            String email,
            String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION
                        )
                )
                .signWith(
                        getKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String extractEmail(
            String token) {

        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(getKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();
    }

    public String extractRole(
            String token) {

        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(getKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

        return claims.get("role", String.class);
    }

    public boolean validateToken(
            String token) {

        try {

            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}