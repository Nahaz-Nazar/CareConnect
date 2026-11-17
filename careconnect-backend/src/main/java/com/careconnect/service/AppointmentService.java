
package com.careconnect.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.careconnect.entity.Appointment;
import com.careconnect.entity.User;
import com.careconnect.exception.ResourceNotFoundException;
import com.careconnect.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date);
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Appointment not found with ID: " + id));
    }

    public List<Appointment> getAppointmentsByPatient(User patient) {
        return appointmentRepository
                .findByPatientOrderByAppointmentDateDescAppointmentTimeDesc(
                        patient);
    }

    public long getTotalAppointments() {
        return appointmentRepository.count();
    }

    public long getCompletedAppointments() {
        return appointmentRepository.countByStatus("COMPLETED");
    }

    public long getCancelledAppointments() {
        return appointmentRepository.countByStatus("CANCELLED");
    }

    public long getBookedAppointments() {
        return appointmentRepository.countByStatus("BOOKED");
    }
}
