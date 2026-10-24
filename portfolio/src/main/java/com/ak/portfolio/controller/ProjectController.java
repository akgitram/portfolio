package com.ak.portfolio.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.portfolio.dto.ProjectRequest;
import com.ak.portfolio.entity.Project;
import com.ak.portfolio.service.ProjectService;

@RestController 
@RequestMapping("/api/projects")
public class ProjectController {
    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequest request){
        projectService.createProject(request);
        return ResponseEntity.ok("Project Created");
    }
    @GetMapping("/{id}")
     public ResponseEntity<?> getProject(@PathVariable Long id){
        return ResponseEntity.ok(projectService.getProject(id));
     }
     @GetMapping
     public ResponseEntity<List<Project>> getAll(){
        return ResponseEntity.ok(projectService.getAllProject());
     }

     @PatchMapping("/{id}")
     public ResponseEntity<?> getProject(@PathVariable Long id,@RequestBody ProjectRequest request){
        return ResponseEntity.ok(projectService.updateProject(request, id));
     }
     @DeleteMapping("/{id}")
     public ResponseEntity<?> deleteProject(@PathVariable Long id){
        return ResponseEntity.ok(projectService.deleteProject(id));
     }

    
}
