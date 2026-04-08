# Job Application Tracker

A full-stack web application for tracking job applications, interview progress, and outcomes. This project allows users to create, update, delete, filter, search, sort, and paginate job applications while integrating a React frontend with a Spring Boot backend and PostgreSQL database.

## Features
* Create job applications
* Edit existing applications
* Delete applications
* Search by company or role
* Filter by application status
* Sort by company, status, or date
* Pagination for job listings
* Date applied tracking
* Form validation
* REST API integration
* Responsive UI components

## Tech Stack

### Frontend
* React
* JavaScript
* HTML
* CSS
* Fetch API

### Backend
* Java
* Spring Boot
* Spring Data JPA
* REST API

### Database
* PostgreSQL

### Tools
* Git
* Maven
* Postman

## Application Architecture
```
React Frontend
      |
      v
Spring Boot REST API
      |
      v
PostgreSQL Database
```
## API Endpoints

Base URL:  
`/api/applications`

| Method	| Endpoint | Description |
| --- | --- | --- |
| GET	| /api/applications	| Get all applications |
| GET	| /api/applications/{id}	| Get application by ID |
| POST | /api/applications	| Create new application |
| PUT	| /api/applications/{id}	| Update application |
| DELETE	| /api/applications/{id}	| Delete application |

## Search

Users can search job applications by:
* Company name
* Role
Search updates results dynamically and works with filtering, sorting, and pagination.

## Pagination

Pagination is implemented on the frontend to limit the number of job applications displayed per page.
* Configurable jobs per page
* Previous / Next navigation
* Resets page on filter and sort change

## Sorting

Users can sort job applications by:
* Date applied
* Company name
* Status


## Filtering

Users can filter job applications by:
* All
* Applied
* Interviewing
* Rejected
* Offer

## Getting Started

### Backend Setup
Clone the repository:  
`git clone https://github.com/Jose-bastardo/job-application-tracker`

Navigate to backend:  
`cd backend`

Configure application.properties:  
```
spring.datasource.url=jdbc:postgresql://localhost:5432/jobtracker
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Run Spring Boot:  
`mvn spring-boot:run`

Backend runs on:  
`http://localhost:8080`

### Frontend Setup

Navigate to frontend:  
`cd frontend`

Install dependencies:  
`npm install`

Run dev server:  
`npm run dev`

Frontend runs on:  
`http://localhost:5173`

## Project Structure
```
frontend/
  src/
    components/
      JobForm.jsx
      JobList.jsx
      FilterBar.jsx
      SortBar.jsx
      Pagination.jsx
      SearchBar.jsx
    App.jsx

backend/
  controller/
  service/
  repository/
  model/
```

## Future Improvements
* Authentication (login/register)
* Backend pagination
* Unit tests
* Deployment
* UI improvements

## Author

Jose Bastardo  
LinkedIn: https://www.linkedin.com/in/josebastardo  
GitHub: https://github.com/Jose-bastardo  
