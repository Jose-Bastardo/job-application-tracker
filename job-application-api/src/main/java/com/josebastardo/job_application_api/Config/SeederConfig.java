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
            String[] types = {"Full-Time", "Part-Time", "Contract"};
            String[] links = {"https://www.google.com/about/careers/applications/", "https://careers.microsoft.com/v2/global/en/home.html", "https://www.apple.com/careers/us/", "https://www.amazon.jobs/en/", "https://www.metacareers.com/", "https://www.lockheedmartin.com/en-us/careers/index.html"};

            for (int i = 0; i < 20; i++) {
                Application job = new Application();

                job.setCompany(faker.company().name());
                job.setRole(faker.job().title());
                job.setStatus(statuses[random.nextInt(statuses.length)]);
                job.setType(types[random.nextInt(types.length)]);
                job.setNotes(faker.lorem().sentence());
                job.setLocation(faker.address().city() + ", " + faker.address().stateAbbr());
                job.setLink(links[random.nextInt(links.length)]);
                job.setDateApplied(LocalDate.now().minusDays(random.nextInt(60) + 1));

                jobRepository.save(job);
            }

        };
    }
}