package com.ak.portfolio.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.portfolio.entity.Contact;
import com.ak.portfolio.repositery.ContactRepo;

@RestController 
@RequestMapping("/api/contact")
public class ContactController {
    private ContactRepo contactRepo;

    public ContactController(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    } 
    @PostMapping
    public Contact postConect(@RequestBody Contact contact){
        Contact contact2=contactRepo.save(contact);
        return contact2;
    }
    @GetMapping
    public List<Contact> getAll(){
        List<Contact> con=contactRepo.findAll();
        return con;
    }
    @DeleteMapping("/{id}")
    public Contact delete(@PathVariable Long id){
        Contact con=contactRepo.findById(id)
            .orElseThrow(()->new RuntimeException("not found message"));
        contactRepo.delete(con);
        return con;
    }
}
