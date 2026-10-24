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

import com.ak.portfolio.entity.Experience;
import com.ak.portfolio.repositery.ExperienceRepo;

@RestController 
@RequestMapping("/api/experiences")
public class ExperienceController {
    private ExperienceRepo experienceRepo;

    public ExperienceController(ExperienceRepo experienceRepo) {
        this.experienceRepo = experienceRepo;
    }
   @PostMapping
    public Experience create(@RequestBody Experience serviceItem){
        serviceItem.setId(null);
        return  experienceRepo.save(serviceItem);
    }
    @GetMapping
    public List<Experience> getAll(){
        List<Experience> items=experienceRepo.findAll();
        return items;
    }
    @GetMapping("/{id}")
    public Experience getItem(@PathVariable Long id){
        Experience item=experienceRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Experience not found"));
        return item;
    }
    @PatchMapping("/{id}")
    public Experience update(@RequestBody  Experience serviceItem,@PathVariable Long id){
        Experience item=experienceRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Experience not found"));
    item.setCompany(serviceItem.getCompany());
    item.setRole(serviceItem.getRole());
    item.setDescription(serviceItem.getDescription());
    item.setEndDate(serviceItem.getEndDate());
    item.setStartDate(serviceItem.getStartDate());
    item.setLocation(serviceItem.getLocation());
    item.setCurrent(false);
    item.setId(id);
    experienceRepo.save(item);
    return item;
    }
    @DeleteMapping("/{id}")
    public Experience delete(@PathVariable Long id){
        Experience item=experienceRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Experience not found"));
        experienceRepo.delete(item);
        return item;
    } 
}
