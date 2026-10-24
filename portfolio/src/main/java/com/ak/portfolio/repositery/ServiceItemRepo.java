package com.ak.portfolio.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ak.portfolio.entity.ServiceItem;

@Repository 
public interface  ServiceItemRepo extends JpaRepository<ServiceItem,Long>{
    
}
