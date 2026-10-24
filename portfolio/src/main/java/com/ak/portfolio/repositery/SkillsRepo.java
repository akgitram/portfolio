package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Skills;

@Repository 
public interface  SkillsRepo extends JpaRepository<Skills,Long>{

    
}
