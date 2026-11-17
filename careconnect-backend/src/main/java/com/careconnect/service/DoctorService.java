
package com.careconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careconnect.entity.Doctor;
import com.careconnect.exception.ResourceNotFoundException;
import com.careconnect.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get doctor by ID
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Doctor not found with ID: " + id));
    }

    // Add doctor
    public Doctor addDoctor(Doctor doctor) {
        if (doctorRepository.existsByEmail(doctor.getEmail())) {
            throw new IllegalArgumentException("Doctor email already exists");
        }

        return doctorRepository.save(doctor);
    }

    // Update doctor
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor doctor = getDoctorById(id);

        doctor.setName(updatedDoctor.getName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());
        doctor.setConsultationFee(updatedDoctor.getConsultationFee());
        doctor.setIsActive(updatedDoctor.getIsActive());

        return doctorRepository.save(doctor);
    }

    // Delete doctor
    public void deleteDoctor(Long id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }

    // Search doctor by name
    public List<Doctor> searchDoctors(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }
}
