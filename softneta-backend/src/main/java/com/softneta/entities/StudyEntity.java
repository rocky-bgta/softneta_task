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
import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "study")
public class StudyEntity {
	
	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "id", nullable = false)
	private UUID id;

	@Column(name="name", nullable = false)
	private String name;
	
	@Size(max=200)
	@Column(name="description", nullable = false)
	private String description;
	
	@Column(name = "updateTime", nullable = false)
	private LocalDate updateTime;
	
}
