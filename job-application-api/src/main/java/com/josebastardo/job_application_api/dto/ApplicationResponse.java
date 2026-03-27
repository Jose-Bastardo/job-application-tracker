package com.josebastardo.job_application_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class ApplicationResponse {

    @NotBlank
    @Setter
    @Getter
    private Long Id;

    @Setter
    @Getter
    private String Company;

    @Setter
    @Getter
    private String Role;

    @Setter
    @Getter
    private String Status;

    @Setter
    @Getter
    private String Notes;

    @Setter
    @Getter
    private LocalDate dateApplied;
}
