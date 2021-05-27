/**
 * Created By: Md. Nazmus Salahin
 * Created Date: 25-May-2021
 * Time: 1:10 PM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.entities;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "person")
public class PatientEntity {
	
	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "id", nullable = false)
	private UUID id;
	
	@Size(max=30)
	@Column(name="person_code", nullable = false, unique = true)
	private String personCode;
	
	@Size(max=50)
	@Column(name="first_name", nullable = false)
	private String firstName;
	
	@Size(max=50)
	@Column(name="last_name", nullable = false)
	private String lastName;
	
	@Column(name = "dob", nullable = false)
	private Date dob;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "p_fk", referencedColumnName = "id")
	List<StudyEntity> studyList = new ArrayList<>();
}
