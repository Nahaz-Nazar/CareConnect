
package com.careconnect.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.careconnect.entity.Appointment;
import com.careconnect.entity.AuthToken;
import com.careconnect.entity.Doctor;
import com.careconnect.entity.User;
import com.careconnect.repository.AppointmentRepository;
import com.careconnect.repository.AuthTokenRepository;
import com.careconnect.repository.DoctorRepository;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentApiController {

    private final AppointmentRepository appointmentRepository;
    private final AuthTokenRepository tokenRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentApiController(
            AppointmentRepository appointmentRepository,
            AuthTokenRepository tokenRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.tokenRepository = tokenRepository;
        this.doctorRepository = doctorRepository;
    }

    private User getPatient(String authorization) {

        if (authorization == null
                || !authorization.startsWith("Bearer ")) {
            return null;
        }

        String token = authorization.substring(7).trim();

        if (token.isEmpty()) {
            return null;
        }

        return tokenRepository.findByToken(token)
                .map(AuthToken::getUser)
                .orElse(null);
    }

    private Map<String, Object> appointmentResponse(
            Appointment appointment) {

        return Map.of(
                "id", appointment.getId(),
                "doctorId", appointment.getDoctor().getId(),
                "doctorName", appointment.getDoctor().getName(),
                "date", appointment.getAppointmentDate().toString(),
                "time", appointment.getAppointmentTime().toString(),
                "status", appointment.getStatus()
        );
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<?> getAppointments(
            @RequestHeader(value = "Authorization", required = false)
            String authorization) {

        User patient = getPatient(authorization);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please login first"));
        }

        List<Map<String, Object>> appointments =
                appointmentRepository
                        .findByPatientOrderByAppointmentDateDescAppointmentTimeDesc(
                                patient)
                        .stream()
                        .map(this::appointmentResponse)
                        .toList();

        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> bookAppointment(
            @RequestHeader(value = "Authorization", required = false)
            String authorization,
            @RequestBody Map<String, String> request) {

        User patient = getPatient(authorization);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please login first"));
        }

        try {
            String doctorIdValue = request.get("doctorId");
            String dateValue = request.get("appointmentDate");
            String timeValue = request.get("appointmentTime");

            if (doctorIdValue == null || dateValue == null
                    || timeValue == null
                    || doctorIdValue.isBlank()
                    || dateValue.isBlank()
                    || timeValue.isBlank()) {

                return ResponseEntity.badRequest()
                        .body(Map.of("message", "All fields are required"));
            }

            Long doctorId = Long.parseLong(doctorIdValue);
            LocalDate date = LocalDate.parse(dateValue);
            LocalTime time = LocalTime.parse(timeValue);

            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElse(null);

            if (doctor == null
                    || Boolean.FALSE.equals(doctor.getIsActive())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Doctor not found"));
            }

            Appointment appointment = new Appointment();
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            appointment.setAppointmentDate(date);
            appointment.setAppointmentTime(time);
            appointment.setStatus("BOOKED");

            Appointment saved =
                    appointmentRepository.saveAndFlush(appointment);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "success", true,
                            "message", "Appointment booked successfully",
                            "appointment", appointmentResponse(saved)
                    ));

        } catch (DateTimeParseException
                | NumberFormatException e) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "Invalid doctor ID, date or time format"));
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> cancelAppointment(
            @RequestHeader(value = "Authorization", required = false)
            String authorization,
            @PathVariable Long id) {

        User patient = getPatient(authorization);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please login first"));
        }

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElse(null);

        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Appointment not found"));
        }

        if (!appointment.getPatient().getId().equals(patient.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message",
                            "You cannot cancel this appointment"));
        }

        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment cancelled successfully"
        ));
    }
}
