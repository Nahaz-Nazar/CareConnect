
package com.careconnect.controller;

import java.time.LocalDate;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.careconnect.service.DoctorService;
import com.careconnect.service.UserService;
import com.careconnect.service.AppointmentService;

@Controller
public class DashboardController {

    private final DoctorService doctorService;
    private final UserService userService;
    private final AppointmentService appointmentService;

    public DashboardController(
            DoctorService doctorService,
            UserService userService,
            AppointmentService appointmentService) {

        this.doctorService = doctorService;
        this.userService = userService;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/")
    public String dashboard(Model model) {

        model.addAttribute("totalDoctors",
                doctorService.getAllDoctors().size());

        model.addAttribute("totalPatients",
                userService.getAllPatients().size());

        model.addAttribute("todayAppointments",
                appointmentService.getAppointmentsByDate(LocalDate.now()).size());

        model.addAttribute("totalBookings",
                appointmentService.getTotalAppointments());

        return "portal/home";
    }
}
