package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.Contact;

@Repository 
public interface  ContactRepo extends JpaRepository<Contact,Long>{
    
}
