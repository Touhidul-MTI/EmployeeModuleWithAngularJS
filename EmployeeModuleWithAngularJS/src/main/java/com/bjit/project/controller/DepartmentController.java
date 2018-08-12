package com.bjit.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bjit.project.model.Department;
import com.bjit.project.service.DepartmentService;

@CrossOrigin
@Controller
public class DepartmentController {
	@Autowired
	private DepartmentService departmentService;
	
	@GetMapping(value="/alldepartments", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<Department> getDepartments() {
		return departmentService.getAllDepartments();
	}
}
