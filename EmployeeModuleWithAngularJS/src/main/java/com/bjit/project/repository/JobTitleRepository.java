package com.bjit.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bjit.project.model.JobTitle;

@Repository
public interface JobTitleRepository extends JpaRepository<JobTitle, Integer>{

}
