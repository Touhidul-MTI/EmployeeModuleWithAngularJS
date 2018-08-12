package com.bjit.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bjit.project.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	
	//my custom to find all employeeName only
	public static final String FIND_EMPLOYEE_NAME = "SELECT employee_name FROM employee";
	@Query(value = FIND_EMPLOYEE_NAME, nativeQuery = true)
	public List<String> findAllNames();
	
	//custom repo to employee search using employee name
	public List<Employee> findByEmployeeNameIgnoreCaseContaining(String employeeName); 
	
}
