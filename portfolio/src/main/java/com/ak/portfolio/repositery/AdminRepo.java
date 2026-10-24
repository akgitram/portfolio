package com.ak.portfolio.repositery;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Admin;
import java.util.List;


@Repository 
public interface  AdminRepo extends JpaRepository<Admin,Long> {
    Optional<Admin> findByEmail(String email);
    
}
