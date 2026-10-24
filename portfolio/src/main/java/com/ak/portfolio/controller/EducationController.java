package com.ak.portfolio.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.portfolio.entity.Education;
import com.ak.portfolio.repositery.EducationRepository;

@RestController 
@RequestMapping("/api/educations")
public class EducationController {
    private EducationRepository educationRepository;

    public EducationController(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

     @PostMapping
    public Education create(@RequestBody Education education){
        education.setId(null);
        return  educationRepository.save(education);
    }
    @GetMapping
    public List<Education> getAll(){
        List<Education> items=educationRepository.findAll();
        return items;
    }
    @GetMapping("/{id}")
    public Education getItem(@PathVariable Long id){
        Education item=educationRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        return item;
    }
    @PatchMapping("/{id}")
    public Education update(@RequestBody  Education education,@PathVariable Long id){
        Education item=educationRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
    item.setDegree(education.getDegree());
    item.setInstitution(education.getInstitution());
    item.setDescription(education.getDescription());
    item.setEndYear(education.getEndYear());
    item.setStartYear(education.getStartYear());
    item.setFieldOfStudy(education.getFieldOfStudy());
    item.setGrade(education.getGrade());
    item.setId(id);
    educationRepository.save(item);
    return item;
    }
    @DeleteMapping("/{id}")
    public Education delete(@PathVariable Long id){
        Education item=educationRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        educationRepository.delete(item);
        return item;
    }
    
    
}
