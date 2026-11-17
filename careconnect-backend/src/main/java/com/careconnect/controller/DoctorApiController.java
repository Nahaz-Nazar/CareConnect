
package com.careconnect.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.careconnect.entity.Doctor;
import com.careconnect.repository.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorApiController {

    private final DoctorRepository doctorRepository;

    public DoctorApiController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    private Map<String, Object> doctorResponse(Doctor doctor) {
        Map<String, Object> result = new LinkedHashMap<>();

        result.put("id", doctor.getId());
        result.put("name", doctor.getName());
        result.put("specialization", doctor.getSpecialization());
        result.put("qualification", doctor.getQualification());
        result.put("experience", doctor.getExperience());
        result.put("consultationFee", doctor.getConsultationFee());

        return result;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllDoctors() {
        List<Map<String, Object>> doctors =
                doctorRepository.findAll()
                        .stream()
                        .map(this::doctorResponse)
                        .toList();

        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id)
                .map(doctor -> ResponseEntity.ok(doctorResponse(doctor)))
                .orElse(ResponseEntity.notFound().build());
    }
}
