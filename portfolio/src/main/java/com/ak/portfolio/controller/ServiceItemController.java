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

import com.ak.portfolio.entity.ServiceItem;
import com.ak.portfolio.repositery.ServiceItemRepo;

@RestController 
@RequestMapping("/api/services")
public class ServiceItemController {
    protected ServiceItemRepo serviceItemRepo;

    public ServiceItemController(ServiceItemRepo serviceItemRepo) {
        this.serviceItemRepo = serviceItemRepo;
    }
    @PostMapping
    public ServiceItem create(@RequestBody ServiceItem serviceItem){
        System.out.println("data servies");
        serviceItem.setId(null);
        return  serviceItemRepo.save(serviceItem);
    }
    @GetMapping
    public List<ServiceItem> getAll(){
        List<ServiceItem> items=serviceItemRepo.findAll();
        return items;
    }
    @GetMapping("/{id}")
    public ServiceItem getItem(@PathVariable Long id){
        ServiceItem item=serviceItemRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        return item;
    }
    @PatchMapping("/{id}")
    public ServiceItem update(@RequestBody  ServiceItem serviceItem,@PathVariable Long id){
        ServiceItem item=serviceItemRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
    item.setName(serviceItem.getName());
    item.setDescription(serviceItem.getDescription());
    item.setIcon(serviceItem.getIcon());
    item.setId(id);
    serviceItemRepo.save(item);
    return item;
    }
    @DeleteMapping("/{id}")
    public ServiceItem delete(@PathVariable Long id){
        ServiceItem item=serviceItemRepo.findById(id)
            .orElseThrow(()->new RuntimeException("Service not found"));
        serviceItemRepo.delete(item);
        return item;
    }
}
