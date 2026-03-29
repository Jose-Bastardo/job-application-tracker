package com.josebastardo.job_application_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long Id;

    @Column(nullable = false)
    @Setter
    @Getter
    private String company;

    @Column(nullable = false)
    @Setter
    @Getter
    private String role;

    @Column(nullable = false)
    @Setter
    @Getter
    private String status;

    @Column(length = 100)
    @Setter
    @Getter
    private String notes;

    @Getter
    @Setter
    private LocalDate dateApplied;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        dateApplied = LocalDate.now();
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
