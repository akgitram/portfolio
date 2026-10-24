package com.ak.portfolio.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "projects")
@Getter 
@Setter 
@NoArgsConstructor 
public class Project {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,length =250 )
    private String title;
    @Column(nullable = false,length = 2000)
    private String description;
    @Column(length = 1000)
    private String technologys;
    @Column(length = 1000)
    private String gitUrl;
    @Column(length = 500)
    private String dempUrl;
    private LocalDateTime createdAt;
    private boolean featured=false;
    public Project(String title, String description, String technologys, String gitUrl, String dempUrl,
            LocalDateTime createdAt, boolean featured) {
        this.title = title;
        this.description = description;
        this.technologys = technologys;
        this.gitUrl = gitUrl;
        this.dempUrl = dempUrl;
        this.createdAt = createdAt;
        this.featured = featured;
    }
    
    
}
