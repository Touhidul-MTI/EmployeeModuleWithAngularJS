package com.bjit.project.controller;

import java.util.Map;

public class EmployeeJsonResponse {
	private boolean validated;
	private Map<String, String> errorMessages;

	public EmployeeJsonResponse() {
		
	}

	public EmployeeJsonResponse(boolean validated, Map<String, String> errorMessages) {
		super();
		this.validated = validated;
		this.errorMessages = errorMessages;
	}

	public boolean isValidated() {
		return validated;
	}

	public void setValidated(boolean validated) {
		this.validated = validated;
	}

	public Map<String, String> getErrorMessages() {
		return errorMessages;
	}

	public void setErrorMessages(Map<String, String> errorMessages) {
		this.errorMessages = errorMessages;
	}

	@Override
	public String toString() {
		return "EmployeeJsonResponse [validated=" + validated + ", errorMessages=" + errorMessages + "]";
	}
	
}
