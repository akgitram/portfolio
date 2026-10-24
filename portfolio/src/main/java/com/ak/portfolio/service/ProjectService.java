package com.ak.portfolio.service;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ak.portfolio.dto.ProjectRequest;
import com.ak.portfolio.entity.Project;
import com.ak.portfolio.repositery.ProjectRepo;

@Service 
public class ProjectService {
    private ProjectRepo projectRepo;

    public ProjectService(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }
    
    public String createProject(ProjectRequest projectRequest){
        Project project=new Project();
        copyProject(projectRequest, project);
        projectRepo.save(project);
        return "Project is save";
    }
    public Project getProject(Long id){
        Project project=projectRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Project Not Fount"));
        return project;
    }
    public Project updateProject(ProjectRequest request,Long id){
        Project project=projectRepo.findById(id)
            .orElseThrow(()-> new RuntimeException("Not Exists"));
        copyProject(request, project);
        return  projectRepo.save(project);
    }
    public Project deleteProject(Long id){
        Project project=projectRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Project not found"));
        projectRepo.delete(project);
        return project;
    }

    public List<Project> getAllProject(){
      List<Project> project=projectRepo.findAll();
      return project;
    }

    public void copyProject(ProjectRequest request,Project project){
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setTechnologys(request.getTechnologies());
        project.setGitUrl(request.getGithubUrl());
        project.setDempUrl(request.getDemoUrl());
        project.setCreatedAt(LocalDateTime.now());
        project.setFeatured(request.isFeatured());
    }
 
}
