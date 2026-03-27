package com.josebastardo.job_application_api.Repository;

import com.josebastardo.job_application_api.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStatusIgnoreCase(String status);
    Optional<Application> findById(Long Id);
}
