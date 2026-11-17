
package com.careconnect.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.careconnect.entity.Appointment;
import com.careconnect.service.AppointmentService;

@Controller
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Display all appointments - Full Appointment History
    @GetMapping("/history")
    public String appointmentHistory(Model model) {

        List<Appointment> appointments =
                appointmentService.getAllAppointments();

        model.addAttribute("appointments", appointments);

        return "portal/appointments/history";
    }

    // Display appointments by selected date
    @GetMapping
    public String listAppointments(
            @RequestParam(required = false) String date,
            Model model) {

        LocalDate selectedDate;

        if (date == null || date.isBlank()) {
            selectedDate = LocalDate.now();
        } else {
            selectedDate = LocalDate.parse(date);
        }

        model.addAttribute(
                "appointments",
                appointmentService.getAppointmentsByDate(selectedDate));

        model.addAttribute("selectedDate", selectedDate);

        return "portal/appointments/list";
    }

    // View appointment details
    @GetMapping("/view/{id}")
    public String viewAppointment(
            @PathVariable Long id,
            Model model) {

        model.addAttribute(
                "appointment",
                appointmentService.getAppointmentById(id));

        return "portal/appointments/view";
    }
}
