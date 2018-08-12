package com.bjit.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bjit.project.model.JobTitle;
import com.bjit.project.repository.JobTitleRepository;

@Service
public class JobTitleService {
	@Autowired
	private JobTitleRepository jobTitleRepository;
	
	public List<JobTitle> getAllJobTitles() {
		List<JobTitle> jobTitles = new ArrayList<>();
		jobTitleRepository.findAll().forEach(jobTitles::add);
		
		return jobTitles;
	}
}
