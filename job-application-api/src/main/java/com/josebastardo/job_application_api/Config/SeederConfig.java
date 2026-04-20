package com.josebastardo.job_application_api.Config;

import com.josebastardo.job_application_api.model.Application;
import com.josebastardo.job_application_api.Repository.ApplicationRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Random;

@Configuration
public class SeederConfig {

    @Value("${app.seed-demo-data}")
    private boolean seedDemoData;

    @Bean
    CommandLineRunner seedDatabase(ApplicationRepository jobRepository) {
        return args -> {
            if (!seedDemoData) {
                return;
            }

            jobRepository.deleteAll();

            Faker faker = new Faker();
            Random random = new Random();

            String[] statuses = {"Applied", "Interviewing", "Offer", "Rejected"};

            for (int i = 0; i < 20; i++) {
                Application job = new Application();

                job.setCompany(faker.company().name());
                job.setRole(faker.job().title());
                job.setStatus(statuses[random.nextInt(statuses.length)]);
                job.setNotes(faker.lorem().sentence());
                job.setDateApplied(LocalDate.now().minusDays(random.nextInt(60) + 1));

                jobRepository.save(job);
            }

        };
    }
}