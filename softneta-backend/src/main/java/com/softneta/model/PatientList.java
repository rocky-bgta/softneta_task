package com.softneta.model;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class PatientList {
	private UUID id;
	private String personCode;
	private String fullName;
	private Date dob;
	private String studyName;
	private Date date;
	
}
