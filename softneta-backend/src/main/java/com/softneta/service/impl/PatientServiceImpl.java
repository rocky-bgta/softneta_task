/**
 * Created By: Md. Nazmus Salahin
 * Created Date:  25-May-2021
 * Time: 5:26 AM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.service.impl;


import com.softneta.constant.MessageConstant;
import com.softneta.core.ResponseObject;
import com.softneta.entities.PatientEntity;
import com.softneta.entities.StudyEntity;
import com.softneta.model.PatientList;
import com.softneta.repository.PatientRepository;
import com.softneta.service.PatientService;
import com.softneta.utilities.UtilityMethods;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PatientServiceImpl implements PatientService {
	
    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public ResponseObject createPatient(PatientEntity patientEntity) {
        ResponseObject responseObject;
        String personCode;
        PatientEntity existingPatient;
        try {
        	    personCode = patientEntity.getPersonCode();
        	    existingPatient = this.patientRepository.getPatientEntityByPersonCode(personCode);
        	    if(existingPatient==null) {
		            patientEntity = this.patientRepository.save(patientEntity);
		            responseObject = UtilityMethods.buildResponseObject(patientEntity,
			            MessageConstant.SUCCESSFULLY_CREATED,
			            HttpStatus.OK);
	            }else {
		            responseObject = UtilityMethods.buildResponseObject(null,
			            MessageConstant.DUPLICATE_ENTITY,
			            HttpStatus.ALREADY_REPORTED);
	            }
             
        } catch (Exception ex) {
            log.error("createPatient method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_CREATE,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseObject;
    }

    @Override
    public ResponseObject updatePatient(PatientEntity patientEntity) {
        PatientEntity updatedPatientEntity;
        ResponseObject responseObject;
        try {
                updatedPatientEntity = this.patientRepository.save(patientEntity);
                responseObject = UtilityMethods.buildResponseObject(updatedPatientEntity,
                        MessageConstant.SUCCESSFULLY_UPDATED,
                        HttpStatus.OK);
        } catch (Exception ex) {
            log.error("updatePatient method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_UPDATE,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseObject;
    }

    @Override
    public ResponseObject getPatientById(UUID id) {
        Optional<PatientEntity> patientEntity;
        ResponseObject responseObject;
        try {
            patientEntity = this.patientRepository.findById(id);
            if (patientEntity.isPresent()) {
                responseObject = UtilityMethods.buildResponseObject(patientEntity,
                        MessageConstant.SUCCESSFULLY_GET_BY_ID,
                        HttpStatus.OK);
            } else {
                responseObject = UtilityMethods.buildResponseObject(null,
                        MessageConstant.REQUESTED_INFO_DOES_NOT_EXIST_NOW,
                        HttpStatus.NO_CONTENT);
            }
        } catch (Exception ex) {
            log.error("getTodoById method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_UPDATE,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseObject;
    }
	
    @Override
    public ResponseObject getAllPatientInfo() {
        ResponseObject responseObject;
        List<PatientList> unsortedPatientList = new ArrayList<>();
        List<PatientList> sortedPatientList;
        try {
            List<PatientEntity> patientEntities = this.patientRepository.findAll();

	        for (PatientEntity item: patientEntities) {
		        for (StudyEntity study: item.getStudyList()) {
			        PatientList patient = new PatientList();
			        patient.setId(item.getId());
			        patient.setFullName(item.getFirstName()+" "+ item.getLastName());
			        patient.setPersonCode(item.getPersonCode());
			        patient.setStudyName(study.getName());
			        patient.setDob(item.getDob());
			        patient.setDate(study.getDate());
			        unsortedPatientList.add(patient);
		        }
	        }
	        
	        sortedPatientList = unsortedPatientList.stream()
		                                        .sorted(Comparator.comparing(PatientList::getDate).reversed())
		                                        .collect(Collectors.toList());
	        
            responseObject = UtilityMethods.buildResponseObject(sortedPatientList,
                    MessageConstant.SUCCESSFULLY_GET_ALL,
                    HttpStatus.OK);

        } catch (Exception ex) {
            log.error("getAllPatientInfo method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_GET_ALL,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseObject;
    }

    @Override
    public ResponseObject deletePatientById(UUID id) {
        ResponseObject responseObject;
        try {
            this.patientRepository.deleteById(id);
            responseObject = UtilityMethods.buildResponseObject(id,
                    MessageConstant.SUCCESSFULLY_DELETE,
                    HttpStatus.OK);
        } catch (Exception ex) {
            log.error("deletePatientById method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_DELETE,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseObject;
    }
}
