package com.bjit.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bjit.project.model.Country;
import com.bjit.project.service.CountryService;

@CrossOrigin
@Controller
public class CountryController {
	@Autowired
	private CountryService countryService;
	
	@GetMapping(value="/allcountries", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<Country> getCountries() {
		return countryService.getAllCountries();
	}
}
