/**
 * Created By: Md. Nazmus Salahin
 * Created Date: 17-April-2021
 * Time: 8:14 PM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.controller;


import com.softneta.core.ResponseObject;
import com.softneta.entities.PatientEntity;
import com.softneta.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/patient-info/",
	consumes= {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.ALL_VALUE},
	produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    private final PatientService patientService;

    @Autowired
	public PatientController(PatientService patientService) {
		this.patientService = patientService;
	}
	
	@PostMapping("create")
    public ResponseObject createGateway(@Valid @RequestBody PatientEntity gatewayEntity){
        ResponseObject responseObject;
		responseObject = this.patientService.createPatient(gatewayEntity);
        return responseObject;
    }
	
	@GetMapping("get/{id}")
	public ResponseObject getGatewayById(@PathVariable UUID id){
		ResponseObject responseObject;
		responseObject = this.patientService.getPatientById(id);
		return responseObject;
	}
	
	@GetMapping("list")
	public ResponseObject getAllGateway(){
		ResponseObject responseObject;
		responseObject = this.patientService.getAllPatientInfo();
		return responseObject;
	}
 
	@PutMapping("update")
	public ResponseObject updateGateway(@Valid @RequestBody PatientEntity patientEntity){
		ResponseObject responseObject;
		responseObject = this.patientService.updatePatient(patientEntity);
		return responseObject;
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseObject deleteGateway(@PathVariable UUID id){
		ResponseObject responseObject;
		responseObject = this.patientService.deletePatientById(id);
		return responseObject;
	}
	
}
