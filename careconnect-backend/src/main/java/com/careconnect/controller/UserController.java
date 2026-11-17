
package com.careconnect.controller;

import java.util.Comparator;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.careconnect.entity.User;
import com.careconnect.service.UserService;
import com.careconnect.service.AppointmentService;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AppointmentService appointmentService;

    public UserController(
            UserService userService,
            AppointmentService appointmentService) {

        this.userService = userService;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public String listPatients(Model model) {

        model.addAttribute(
                "patients",
                userService.getAllPatients()
                        .stream()
                        .sorted(Comparator.comparing(User::getId))
                        .toList()
        );

        return "portal/users/list";
    }

    @GetMapping("/view/{id}")
    public String viewPatient(
            @PathVariable Long id,
            Model model) {

        User patient = userService.getPatientById(id);

        model.addAttribute("patient", patient);

        model.addAttribute(
                "appointments",
                appointmentService.getAppointmentsByPatient(patient)
        );

        return "portal/users/details";
    }
}
