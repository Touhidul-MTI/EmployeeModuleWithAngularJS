package com.bjit.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bjit.project.model.JobTitle;
import com.bjit.project.service.JobTitleService;

@CrossOrigin
@Controller
public class JobTitleController {
	@Autowired
	private JobTitleService jobTitleService;
	
	@GetMapping(value="/alljobtitles", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<JobTitle> getJobTitles() {
		return jobTitleService.getAllJobTitles();
	}
}
