package com.josebastardo.job_application_api.Service;

import com.josebastardo.job_application_api.Repository.ApplicationRepository;
import com.josebastardo.job_application_api.dto.ApplicationRequest;
import com.josebastardo.job_application_api.dto.ApplicationResponse;
import com.josebastardo.job_application_api.model.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository){
        this.applicationRepository = applicationRepository;
    }

    public ApplicationResponse createNewApplication(ApplicationRequest request){
        Application application = new Application();
        application.setCompany(request.getCompany());
        application.setRole(request.getRole());
        application.setLink(request.getLink());
        application.setLocation(request.getLocation());
        application.setType(request.getType());
        application.setStatus(request.getStatus());
        application.setNotes(request.getNotes());
        application.setDateApplied(request.getDateApplied());
        applicationRepository.save(application);
        return convertToAppResponse(application);
    }

    public List<ApplicationResponse> GetAllApps(){
        return convertAppList(applicationRepository.findAll());
    }

    public List<ApplicationResponse> GetAppsByStatus(String status){
        return convertAppList(applicationRepository.findByStatusIgnoreCase(status));
    }

    public ApplicationResponse GetAppById(Long Id){
        return convertToAppResponse(applicationRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Application not found")));
    }

    public ApplicationResponse updateApplication(ApplicationRequest request, Long Id){
        Application application = applicationRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setCompany(request.getCompany());
        application.setRole(request.getRole());
        application.setLocation(request.getLocation());
        application.setLink(request.getLink());
        application.setType(request.getType());
        application.setStatus(request.getStatus());
        application.setNotes(request.getNotes());
        application.setDateApplied(request.getDateApplied());
        applicationRepository.save(application);
        return convertToAppResponse(application);
    }

    public void deleteApplication(Long Id){
        applicationRepository.delete(applicationRepository.getReferenceById(Id));
    }

    public ApplicationResponse convertToAppResponse(Application application){
        ApplicationResponse response = new ApplicationResponse();
        response.setId(application.getId());
        response.setCompany(application.getCompany());
        response.setRole(application.getRole());
        response.setLocation(application.getLocation());
        response.setLink(application.getLink());
        response.setType(application.getType());
        response.setStatus(application.getStatus());
        response.setNotes(application.getNotes());
        response.setDateApplied(application.getDateApplied());
        return response;
    }

    public List<ApplicationResponse> convertAppList(List<Application> applications){
        return applications.stream()
                .map(this::convertToAppResponse) // Map each individual entity
                .collect(Collectors.toList());
    }

}
