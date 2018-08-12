package com.bjit.project.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="employee")
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="employee_id")
	private int id;
	
	//----------------------
	//public information
	//----------------------
	
	@Column(name = "employee_name", length = 64, nullable = false)
	@NotEmpty(message = "Enter full name.")
	private String employeeName;
	
	@Column(name = "work_type", length = 32)
	private String workType;
	
	@Column(name = "profile_picture", length = 128)
	private String profilePicture;
	
	//contact information
	//----------------------
	@Column(name = "working_address", length = 128, nullable = false)
	@NotNull(message = "Select company.")
	private String workingAddress;
	
	@Column(name = "work_mobile", length = 16, nullable = false)
	@NotEmpty(message = "Enter mobile no.")
	private String workMobile;
	
	@Column(name = "work_location", length = 64, nullable = false)
	@NotEmpty(message = "Enter work location.")
	private String workLocation;
	
	@Column(name = "work_email", length = 64, nullable = false)
	@NotEmpty(message = "Enter email.")
	@Email(message = "Enter a valid email.")
	private String workEmail;
	
	@Column(name = "work_phone", length = 16, nullable = true)
	private String workPhone;
	
	//position
	//----------------------
	@Column(name = "department", length = 32, nullable = false)
	@NotNull(message = "Select department.")
	private String department;
	
	@Column(name = "job_title", length = 64, nullable = false)
	@NotNull(message = "Select job title.")
	private String jobTitle;
	
	@Column(name = "manager", length = 64)
	private String manager;
	
	@Column(name = "coach", length = 64)
	private String coach;
	
	@Column(name = "other_information", length = 64)
	private String otherInformation;
	
	//-----------------------
	//personal information
	//-----------------------
	
	@Column(name = "nationality", length = 32, nullable = false)
	@NotNull(message = "Select country.")
	private String nationality;
	
	@Column(name = "identification_no", length = 32)
	private String identificationNo;
	
	@Column(name = "passport_no", length = 32)
	private String passportNo;
	
	@Column(name = "bank_account_number", length = 32)
	private String bankAccountNumber;
	
	@Column(name = "gender", length = 8, nullable = false)
	@NotNull(message = "Select gender.")
	private String gender;
	
	@Column(name = "marital_status", length = 16)
	private String maritalStatus;
	
	@Column(name = "home_address", length = 128)
	private String homeAddress;
	
	//@DateTimeFormat(iso=ISO.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name = "date_of_birth", nullable = false)
	@NotNull(message = "Select data of birth.")
	private Date dateOfBirth;

	public Employee() {
		
	}

	public Employee(int id, String employeeName, String workType, String profilePicture, String workingAddress,
			String workMobile, String workLocation, String workEmail, String workPhone, String department,
			String jobTitle, String manager, String coach, String otherInformation, String nationality,
			String identificationNo, String passportNo, String bankAccountNumber, String gender, String maritalStatus,
			String homeAddress, Date dateOfBirth) {
		super();
		this.id = id;
		this.employeeName = employeeName;
		this.workType = workType;
		this.profilePicture = profilePicture;
		this.workingAddress = workingAddress;
		this.workMobile = workMobile;
		this.workLocation = workLocation;
		this.workEmail = workEmail;
		this.workPhone = workPhone;
		this.department = department;
		this.jobTitle = jobTitle;
		this.manager = manager;
		this.coach = coach;
		this.otherInformation = otherInformation;
		this.nationality = nationality;
		this.identificationNo = identificationNo;
		this.passportNo = passportNo;
		this.bankAccountNumber = bankAccountNumber;
		this.gender = gender;
		this.maritalStatus = maritalStatus;
		this.homeAddress = homeAddress;
		this.dateOfBirth = dateOfBirth;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getWorkType() {
		return workType;
	}

	public void setWorkType(String workType) {
		this.workType = workType;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getWorkingAddress() {
		return workingAddress;
	}

	public void setWorkingAddress(String workingAddress) {
		this.workingAddress = workingAddress;
	}

	public String getWorkMobile() {
		return workMobile;
	}

	public void setWorkMobile(String workMobile) {
		this.workMobile = workMobile;
	}

	public String getWorkLocation() {
		return workLocation;
	}

	public void setWorkLocation(String workLocation) {
		this.workLocation = workLocation;
	}

	public String getWorkEmail() {
		return workEmail;
	}

	public void setWorkEmail(String workEmail) {
		this.workEmail = workEmail;
	}

	public String getWorkPhone() {
		return workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
		this.coach = coach;
	}

	public String getOtherInformation() {
		return otherInformation;
	}

	public void setOtherInformation(String otherInformation) {
		this.otherInformation = otherInformation;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getIdentificationNo() {
		return identificationNo;
	}

	public void setIdentificationNo(String identificationNo) {
		this.identificationNo = identificationNo;
	}

	public String getPassportNo() {
		return passportNo;
	}

	public void setPassportNo(String passportNo) {
		this.passportNo = passportNo;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getHomeAddress() {
		return homeAddress;
	}

	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", employeeName=" + employeeName + ", workType=" + workType + ", profilePicture="
				+ profilePicture + ", workingAddress=" + workingAddress + ", workMobile=" + workMobile
				+ ", workLocation=" + workLocation + ", workEmail=" + workEmail + ", workPhone=" + workPhone
				+ ", department=" + department + ", jobTitle=" + jobTitle + ", manager=" + manager + ", coach=" + coach
				+ ", otherInformation=" + otherInformation + ", nationality=" + nationality + ", identificationNo="
				+ identificationNo + ", passportNo=" + passportNo + ", bankAccountNumber=" + bankAccountNumber
				+ ", gender=" + gender + ", maritalStatus=" + maritalStatus + ", homeAddress=" + homeAddress
				+ ", dateOfBirth=" + dateOfBirth + "]";
	}
	
}
