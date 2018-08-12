package com.bjit.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bjit.project.model.Country;
import com.bjit.project.repository.CountryRepository;

@Service
public class CountryService {
	@Autowired
	private CountryRepository countryRepository;

	public List<Country> getAllCountries() {
		List<Country> countries = new ArrayList<>();
		countryRepository.findAll().forEach(countries::add);
		
		return countries;
	}
}
