package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Experience;

@Repository 
public interface  ExperienceRepo extends  JpaRepository<Experience,Long>{
    
}
