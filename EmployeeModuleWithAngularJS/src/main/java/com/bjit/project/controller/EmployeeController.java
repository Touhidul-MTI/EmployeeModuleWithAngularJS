package com.bjit.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bjit.project.model.Employee;
import com.bjit.project.service.EmployeeService;

@CrossOrigin
@Controller
public class EmployeeController {
	// number of contents in a page
	private static final int size = 10;
	// String filePath =
	// "E:\\BJIT_work\\J2EE\\EmployeeModule\\src\\main\\resources\\static\\employee-photo";
	String filePath = "/home/hp/eclipse-workspace/EmployeeModule/src/main/resources/static/employee-photo/";

	static String createdFileName = "";

	@Autowired
	private EmployeeService employeeService;

	@GetMapping(value = { "/", "/employees" })
	public String showEmployees() {
		return "index_container_page";
	}

	@PostMapping(value = "/allemployees/{page}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<Employee> getEmployees(@PathVariable int page) {
		return employeeService.getAllEmployees(page, size);
	}
	
	@ResponseBody
	@PostMapping(value="/employees/search/{input}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Employee> getStudentsByName(@PathVariable String input) {
		List<Employee> employeeList = employeeService.getEmployeesByEmployeeName(input);
		
		return employeeList;
	}

	@GetMapping(value = "/allemployeenames", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<String> getEmployeeNames() {
		return employeeService.getAllEmployeeNames();
	}

	@PostMapping(value = "/employees/createemployee", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public EmployeeJsonResponse createEmployee(@Valid @RequestBody Employee employee, BindingResult result) {
		EmployeeJsonResponse respone = new EmployeeJsonResponse();
		System.out.println(employee);
		if (result.hasErrors()) {
			// Get error message
			Map<String, String> errors = result.getFieldErrors().stream()
					.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

			respone.setValidated(false);
			respone.setErrorMessages(errors);
		} else {
/*
			// employee is being updated, need to remove previous profile picture
			Employee existEmployee = employeeService.getEmployee(employee.getId());

			if (existEmployee != null) {

				// new picture created
				if (!createdFileName.equals("")) {

					// remove previous profile picture and
					if (existEmployee.getProfilePicture() != null) {

						removePreviousProfilePicture(existEmployee.getProfilePicture());
					}
				} else {// no new picture created

					// previous profile picture to updated employee
					if (existEmployee.getProfilePicture() != null) {

						employee.setProfilePicture(existEmployee.getProfilePicture());
					}
				}

			}
			// new profile picture to updated employee
			if (!createdFileName.equals("")) {
				employee.setProfilePicture(createdFileName);
				createdFileName = "";
			}
*/
			employeeService.createEmployee(employee);

			respone.setValidated(true);
		}

		return respone;
	}

	@PostMapping(value = "/create-profile-picture", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public void createProfilePicture(@RequestParam("profilePhoto") MultipartFile profilePhoto) {

		String fileName = createCustomFileName(profilePhoto.getOriginalFilename());
		File path = new File(filePath);

		if (!path.exists()) {
			path.mkdirs();
		}
		try {
			Files.copy(profilePhoto.getInputStream(), Paths.get(filePath, fileName));
		} catch (IOException e) {
			e.printStackTrace();
		}

		createdFileName = fileName;
		// System.out.println("profile picture created: " + fileName);
	}

	public String createCustomFileName(String fileName_old) {
		Random rand = new Random();
		int randNum = rand.nextInt(10000) + 1;

		String[] fileName_array = fileName_old.split("\\.");
		String fileName_postFix = fileName_array[fileName_array.length - 1];

		// first part of "employee" + random number + image type
		String fileName_new = "employee" + randNum + "." + fileName_postFix;

		return fileName_new;
	}

	public void removePreviousProfilePicture(String existingProfilePicture) {
		// File fileToDelete = new File(filePath + "\\" + existingProfilePicture);//for
		// windows
		File fileToDelete = new File(filePath + existingProfilePicture);// for ubuntu

		if (fileToDelete.exists()) {
			if (fileToDelete.delete()) {
				System.out.println(existingProfilePicture + ", Image deleted successfully");
			} else {
				System.out.println("Fail to delete image: " + existingProfilePicture);
			}
		}
	}

}
