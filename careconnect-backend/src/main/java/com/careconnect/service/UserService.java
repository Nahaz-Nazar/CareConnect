
package com.careconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careconnect.entity.Role;
import com.careconnect.entity.User;
import com.careconnect.exception.ResourceNotFoundException;
import com.careconnect.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all registered patients
    public List<User> getAllPatients() {
        return userRepository.findByRole(Role.PATIENT);
    }

    // Get patient details by ID
    public User getPatientById(Long id) {
        User patient = userRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Patient not found with ID: " + id
                    )
                );

        if (patient.getRole() != Role.PATIENT) {
            throw new ResourceNotFoundException(
                "Patient not found with ID: " + id
            );
        }

        return patient;
    }
}
