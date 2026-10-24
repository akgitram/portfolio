package com.ak.portfolio.repositery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Project;

@Repository 
public interface  ProjectRepo extends  JpaRepository<Project,Long>{
    @Override
    List<Project> findAll();
    
}