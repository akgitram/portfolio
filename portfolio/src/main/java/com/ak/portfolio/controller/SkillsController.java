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

import com.ak.portfolio.entity.Skills;
import com.ak.portfolio.repositery.SkillsRepo;

@RestController 
@RequestMapping("/api/skills")
public class SkillsController {
    private SkillsRepo skillsRepo;

    public SkillsController(SkillsRepo skillsRepo) {
        this.skillsRepo = skillsRepo;
    }
    @PostMapping
    public Skills create(@RequestBody  Skills skills){
        skills.setId(null);
        return skillsRepo.save(skills);
        
    }
    @GetMapping
    public List<Skills> getAll(){
        List<Skills>  skills=skillsRepo.findAll();
        return skills;
    }

    @GetMapping("/{id}")
    public Skills getSkills(@PathVariable Long id){
        Skills sk=skillsRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Skills not found"));
        return sk;

    }
    @PatchMapping("/{id}")
    public Skills update(@PathVariable Long id,@RequestBody Skills skills){
        Skills sk=skillsRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Skill not found"));
        sk.setName(skills.getName());
        sk.setCategory(skills.getCategory());
        sk.setProficiency(skills.getProficiency());
        sk.setId(id);
        skillsRepo.save(sk);
        return sk;
    }
    @DeleteMapping("/{id}")
    public Skills delete(@PathVariable Long id){
        Skills sk=skillsRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Skills not exists"));
        skillsRepo.delete(sk);
        return sk;
    }
    
}
