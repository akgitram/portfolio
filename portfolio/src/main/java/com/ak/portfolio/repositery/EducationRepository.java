package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Education;

@Repository 
public interface  EducationRepository extends  JpaRepository<Education,Long>{
    
}
