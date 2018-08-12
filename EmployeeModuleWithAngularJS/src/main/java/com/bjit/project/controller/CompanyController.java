package com.bjit.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bjit.project.model.Company;
import com.bjit.project.service.CompanyService;

@CrossOrigin
@Controller
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@GetMapping(value="/allcompanies", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<Company> getCompanies() {
		return companyService.getAllCompanies();
	}
}
