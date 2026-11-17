
package com.careconnect.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.careconnect.entity.Role;
import com.careconnect.entity.User;
import com.careconnect.repository.UserRepository;

@Configuration
public class AdminDataInitializer {

    @Bean
    public CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            System.out.println(">>> ADMIN INITIALIZER STARTED <<<");

            String email = "admin@careconnect.com";

            User admin = userRepository.findByEmail(email)
                    .orElseGet(User::new);

            admin.setFirstName("CareConnect");
            admin.setLastName("Admin");
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setActive(true);

            userRepository.saveAndFlush(admin);

            System.out.println(">>> ADMIN PASSWORD RESET SUCCESS <<<");
        };
    }
}
