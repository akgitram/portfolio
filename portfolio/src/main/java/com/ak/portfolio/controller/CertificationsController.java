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

import com.ak.portfolio.entity.Certifications;
import com.ak.portfolio.repositery.CertificationsRepo;

@RestController 
@RequestMapping("/api/certifications")
public class CertificationsController {
    private CertificationsRepo certificationsRepo;

    public CertificationsController(CertificationsRepo certificationsRepo) {
        this.certificationsRepo = certificationsRepo;
    }
     @PostMapping
    public Certifications create(@RequestBody Certifications certifications){
        certifications.setId(null);
        return  certificationsRepo.save(certifications);
    }
    @GetMapping
    public List<Certifications> getAll(){
        List<Certifications> items=certificationsRepo.findAll();
        return items;
    }
    @GetMapping("/{id}")
    public Certifications getItem(@PathVariable Long id){
        Certifications item=certificationsRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        return item;
    }
    @PatchMapping("/{id}")
    public Certifications update(@RequestBody  Certifications certifications,@PathVariable Long id){
        Certifications item=certificationsRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
    item.setName(certifications.getName());
    item.setDescription(certifications.getDescription());
    item.setImageUrl(certifications.getImageUrl());
    item.setIssuer(certifications.getIssuer());
    item.setId(id);
    certificationsRepo.save(item);
    return item;
    }
    @DeleteMapping("/{id}")
    public Certifications delete(@PathVariable Long id){
        Certifications item=certificationsRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        certificationsRepo.delete(item);
        return item;
    }
    
    
}
