package com.bjit.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bjit.project.model.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer>{

}
