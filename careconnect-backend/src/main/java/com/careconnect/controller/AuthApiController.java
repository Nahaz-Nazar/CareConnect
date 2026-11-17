
package com.careconnect.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import com.careconnect.entity.AuthToken;
import com.careconnect.entity.Role;
import com.careconnect.entity.User;
import com.careconnect.repository.AuthTokenRepository;
import com.careconnect.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
public class AuthApiController {

    private final UserRepository userRepository;
    private final AuthTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityContextRepository securityContextRepository;

    public AuthApiController(
            UserRepository userRepository,
            AuthTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            SecurityContextRepository securityContextRepository) {

        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Map<String, String> request) {

        try {
            String name = request.get("user_name");
            String email = request.get("email");
            String phoneNumber = request.get("phoneNumber");
            String gender = request.get("gender");
            String dateOfBirth = request.get("dateOfBirth");
            String address = request.get("address");
            String password = request.get("password");

            if (name == null || name.isBlank()
                    || email == null || email.isBlank()
                    || phoneNumber == null || phoneNumber.isBlank()
                    || gender == null || gender.isBlank()
                    || dateOfBirth == null || dateOfBirth.isBlank()
                    || address == null || address.isBlank()
                    || password == null || password.isBlank()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "All fields are required"));
            }

            name = name.trim();
            email = email.trim().toLowerCase();
            phoneNumber = phoneNumber.trim();
            gender = gender.trim();
            address = address.trim();

            if (!phoneNumber.matches("[0-9]{10}")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message",
                        "Phone number must contain exactly 10 digits"));
            }

            if (!gender.equals("Male")
                    && !gender.equals("Female")
                    && !gender.equals("Other")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Please select a valid gender"));
            }

            if (password.length() < 8) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message",
                        "Password must contain at least 8 characters"));
            }

            LocalDate dob;

            try {
                dob = LocalDate.parse(dateOfBirth);
            } catch (Exception e) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Please enter a valid date of birth"));
            }

            if (dob.isAfter(LocalDate.now())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message",
                        "Date of birth cannot be in the future"));
            }

            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
            }

            String[] nameParts = name.split("\\s+", 2);

            User user = new User();
            user.setFirstName(nameParts[0]);
            user.setLastName(nameParts.length > 1 ? nameParts[1] : "");
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            user.setGender(gender);
            user.setDateOfBirth(dob);
            user.setAddress(address);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(Role.PATIENT);
            user.setActive(true);

            userRepository.saveAndFlush(user);

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                    "success", true,
                    "message", "Registration successful"
                ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Registration failed"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || email.isBlank()
                || password == null || password.isBlank()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email and password are required"));
        }

        User user = userRepository
            .findByEmail(email.trim().toLowerCase())
            .orElse(null);

        if (user == null || user.getRole() != Role.PATIENT
                || !user.isActive()
                || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password"));
        }

        return createLoginResponse(user);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(
            @RequestBody Map<String, String> request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || email.isBlank()
                || password == null || password.isBlank()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email and password are required"));
        }

        User admin = userRepository
            .findByEmail(email.trim().toLowerCase())
            .orElse(null);

        if (admin == null || admin.getRole() != Role.ADMIN
                || !admin.isActive()
                || !passwordEncoder.matches(password, admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid admin email or password"));
        }

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                admin.getEmail(),
                null,
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );

        SecurityContext context =
            SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        securityContextRepository.saveContext(
            context, httpRequest, httpResponse
        );

        return createLoginResponse(admin);
    }

    private ResponseEntity<?> createLoginResponse(User user) {

        tokenRepository.deleteByUser(user);

        AuthToken authToken = new AuthToken();
        authToken.setToken(UUID.randomUUID().toString());
        authToken.setUser(user);
        tokenRepository.save(authToken);

        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "token", authToken.getToken(),
            "user", Map.of(
                "id", user.getId(),
                "firstName", user.getFirstName() == null ? "" : user.getFirstName(),
                "lastName", user.getLastName() == null ? "" : user.getLastName(),
                "email", user.getEmail() == null ? "" : user.getEmail(),
                "phoneNumber", user.getPhoneNumber() == null ? "" : user.getPhoneNumber(),
                "gender", user.getGender() == null ? "" : user.getGender(),
                "dateOfBirth", user.getDateOfBirth() == null
                    ? "" : user.getDateOfBirth().toString(),
                "address", user.getAddress() == null ? "" : user.getAddress(),
                "role", user.getRole().name()
            )
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader(value = "Authorization", required = false)
            String authorization) {

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Authentication token required"));
        }

        tokenRepository.deleteByToken(authorization.substring(7));

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader(value = "Authorization", required = false)
            String authorization,
            @RequestBody Map<String, String> request) {

        try {
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please login first"));
            }

            String token = authorization.substring(7);

            AuthToken authToken = tokenRepository.findByToken(token)
                .orElse(null);

            if (authToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid login session"));
            }

            User user = userRepository.findById(
                authToken.getUser().getId()
            ).orElse(null);

            if (user == null || user.getRole() != Role.PATIENT
                    || !user.isActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Patient account not found"));
            }

            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");

            if (currentPassword == null || currentPassword.isBlank()
                    || newPassword == null || newPassword.isBlank()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "All fields are required"));
            }

            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Current password is incorrect"));
            }

            if (newPassword.length() < 8) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message",
                        "Password must contain at least 8 characters"));
            }

            if (passwordEncoder.matches(newPassword, user.getPassword())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message",
                        "New password must be different"));
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password changed successfully"
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Password change failed"));
        }
    }
}
