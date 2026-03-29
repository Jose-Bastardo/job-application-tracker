package com.josebastardo.job_application_api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class ApplicationRequest {

    @Getter
    private String company;

    @Getter
    private String role;

    @Getter
    private String status;

    @Getter
    private String notes;

    @Getter
    private LocalDate dateApplied;

}
