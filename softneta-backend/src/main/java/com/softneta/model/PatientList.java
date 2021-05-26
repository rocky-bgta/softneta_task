package com.softneta.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Data
public class PatientList {
	private UUID id;
	private String personCode;
	private String fullName;
	private LocalDate dob;
	private String studyName;
	private Date date;
	
}
