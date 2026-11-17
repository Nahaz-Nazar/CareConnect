
package com.careconnect.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.careconnect.entity.Doctor;
import com.careconnect.service.DoctorService;

@Controller
@RequestMapping("/admin/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Display all doctors
    @GetMapping
    public String listDoctors(
            @RequestParam(required = false) String keyword,
            Model model) {

        List<Doctor> doctors;

        if (keyword != null && !keyword.trim().isEmpty()) {
            doctors = doctorService.searchDoctors(keyword.trim());
        } else {
            doctors = doctorService.getAllDoctors();
        }

        model.addAttribute("doctors", doctors);
        model.addAttribute("keyword", keyword);

        return "portal/doctors";
    }

    // Show add doctor form
    @GetMapping("/new")
    public String showAddForm(Model model) {
        model.addAttribute("doctor", new Doctor());
        model.addAttribute("pageTitle", "Add New Doctor");
        return "portal/doctor-form";
    }

    // Save doctor
    @PostMapping("/save")
    public String saveDoctor(
            @ModelAttribute Doctor doctor,
            RedirectAttributes redirectAttributes) {

        try {
            doctorService.addDoctor(doctor);
            redirectAttributes.addFlashAttribute(
                    "successMessage", "Doctor added successfully!");
        } catch (IllegalArgumentException exception) {
            redirectAttributes.addFlashAttribute(
                    "errorMessage", exception.getMessage());
            return "redirect:/admin/doctors/new";
        }

        return "redirect:/admin/doctors";
    }

    // Show edit form
    @GetMapping("/edit/{id}")
    public String showEditForm(
            @PathVariable Long id,
            Model model) {

        model.addAttribute("doctor", doctorService.getDoctorById(id));
        model.addAttribute("pageTitle", "Edit Doctor");

        return "portal/doctor-form";
    }

    // Update doctor
    @PostMapping("/update/{id}")
    public String updateDoctor(
            @PathVariable Long id,
            @ModelAttribute Doctor doctor,
            RedirectAttributes redirectAttributes) {

        doctorService.updateDoctor(id, doctor);

        redirectAttributes.addFlashAttribute(
                "successMessage", "Doctor updated successfully!");

        return "redirect:/admin/doctors";
    }

    // Delete doctor
    @GetMapping("/delete/{id}")
    public String deleteDoctor(
            @PathVariable Long id,
            RedirectAttributes redirectAttributes) {

        doctorService.deleteDoctor(id);

        redirectAttributes.addFlashAttribute(
                "successMessage", "Doctor deleted successfully!");

        return "redirect:/admin/doctors";
    }
}
