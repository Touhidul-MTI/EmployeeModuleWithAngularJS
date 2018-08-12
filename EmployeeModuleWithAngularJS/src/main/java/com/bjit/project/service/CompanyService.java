package com.bjit.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bjit.project.model.Company;
import com.bjit.project.repository.CompanyRepository;

@Service
public class CompanyService {
	@Autowired
	private CompanyRepository companyRepository;

	public List<Company> getAllCompanies() {
		List<Company> companies = new ArrayList<>();
		companyRepository.findAll().forEach(companies::add);

		return companies;
	}
}
