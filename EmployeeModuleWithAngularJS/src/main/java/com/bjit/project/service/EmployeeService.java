package com.bjit.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.bjit.project.model.Employee;
import com.bjit.project.repository.EmployeeRepository;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;

	public List<Employee> getAllEmployees(int page, int size) {
		List<Employee> employees = new ArrayList<>();
		employeeRepository.findAll(new PageRequest(page, size)).forEach(employees::add);
		return employees;
	}

	public List<String> getAllEmployeeNames() {
		List<String> employeeNames = new ArrayList<>();
		employeeRepository.findAllNames().forEach(employeeNames::add);

		return employeeNames;
	}

	public void createEmployee(Employee employee) {
		employeeRepository.save(employee);
	}

	public Employee getEmployee(int employeeId) {
		return employeeRepository.findOne(employeeId);
	}
	
	public List<Employee> getEmployeesByEmployeeName(String employeeName) {
		List<Employee> employeeList = new ArrayList<>();
		employeeRepository.findByEmployeeNameIgnoreCaseContaining(employeeName).forEach(employeeList::add);
		return employeeList;
	}
}
