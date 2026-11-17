
package com.careconnect.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.careconnect.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    boolean existsByEmail(String email);

    List<Doctor> findByNameContainingIgnoreCase(String name);

    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    List<Doctor> findByIsActive(Boolean isActive);
}
