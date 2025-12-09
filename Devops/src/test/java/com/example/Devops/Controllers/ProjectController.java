package com.example.Devops.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ProjectController {
    @GetMapping("/")
    public String getProjectInfo() {
      return "Welcome to Devops Project!\n\n" +
               "Project Name: Devops\n" +
               "Description: Judicial chatbot\n" +
               "Version: 0.0.1-SNAPSHOT\n" +
               "Java Version: 17\n" +
               "Spring Boot Version: 4.0.0\n" +
               "Server Port: 8082\n\n" +
               "Available endpoints:\n" +
               "- GET / : Project information (this page)\n" +
               "- GET /h2-console : H2 Database Console (dev only)\n\n" +
               "Database: H2 in-memory (jdbc:h2:mem:devdb)\n" +
               "Status: Running ✓";
    }
    @GetMapping("/info")
    public String getMethodName(@RequestParam String param) {
      return "Devops - Judicial Chatbot Project\n" +
               "A Spring Boot application for judicial chatbot functionality.\n" +
               "Running on port 8082 with H2 in-memory database.";
    }
    
    
    
}
