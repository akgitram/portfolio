package com.ak.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/api")
public class TestController {

    @GetMapping("/me")
    public String home(){
        return "home page";
    }
    
}
