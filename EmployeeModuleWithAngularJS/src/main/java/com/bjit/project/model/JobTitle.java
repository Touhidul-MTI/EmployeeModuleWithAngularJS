package com.bjit.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="jobtitle")
public class JobTitle {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="job_title_id")
	private int id;
	
	@Column(name = "job_title_name", length = 32)
	private String jobTitleName;

	public JobTitle() {
		
	}

	public JobTitle(int id, String jobTitleName) {
		super();
		this.id = id;
		this.jobTitleName = jobTitleName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getJobTitleName() {
		return jobTitleName;
	}

	public void setJobTitleName(String jobTitleName) {
		this.jobTitleName = jobTitleName;
	}

	@Override
	public String toString() {
		return "JobTitle [id=" + id + ", jobTitleName=" + jobTitleName + "]";
	}
	
}
