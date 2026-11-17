
package com.careconnect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.careconnect.service.AppointmentService;

@Controller
public class ReportsController {

    private final AppointmentService appointmentService;

    public ReportsController(
            AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/reports")
    public String reports(Model model) {

        model.addAttribute("totalAppointments",
                appointmentService.getTotalAppointments());

        model.addAttribute("completedAppointments",
                appointmentService.getCompletedAppointments());

        model.addAttribute("cancelledAppointments",
                appointmentService.getCancelledAppointments());

        model.addAttribute("bookedAppointments",
                appointmentService.getBookedAppointments());

        return "portal/reports";
    }
}
