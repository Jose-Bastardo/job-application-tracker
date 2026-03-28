package com.josebastardo.job_application_api.Controller;

import com.josebastardo.job_application_api.Service.ApplicationService;
import com.josebastardo.job_application_api.dto.ApplicationRequest;
import com.josebastardo.job_application_api.dto.ApplicationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService){
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<ApplicationResponse> GetAllApplications(){
        return applicationService.GetAllApps();
    }

    @GetMapping("/status/{status}")
    public List<ApplicationResponse> GetAppsByStatus(@PathVariable String status){
        return applicationService.GetAppsByStatus(status);
    }

    @GetMapping("{Id}")
    public ApplicationResponse GetAppById(@PathVariable Long Id){
        return applicationService.GetAppById(Id);
    }

    @PostMapping
    public ApplicationResponse createNewApp(@RequestBody ApplicationRequest request){
        return applicationService.createNewApplication(request);
    }

    @PutMapping("/{Id}")
    public ApplicationResponse updateApp(@RequestBody ApplicationRequest request, @PathVariable Long Id){
        return applicationService.updateApplication(request, Id);
    }

    @DeleteMapping("{Id}")
    public ResponseEntity<Void> deleteApp(@PathVariable Long Id){
        applicationService.deleteApplication(Id);
        return ResponseEntity.noContent().build();
    }
}
