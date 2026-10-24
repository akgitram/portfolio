package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Certifications;

@Repository 
public interface  CertificationsRepo extends JpaRepository<Certifications,Long>{
    
}
