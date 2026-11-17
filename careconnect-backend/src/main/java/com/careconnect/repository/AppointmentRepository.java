
package com.careconnect.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careconnect.entity.Appointment;
import com.careconnect.entity.User;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    List<Appointment> findByPatientOrderByAppointmentDateDescAppointmentTimeDesc(
            User patient);

    long countByStatus(String status);
}
