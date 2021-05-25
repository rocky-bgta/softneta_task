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
import com.softneta.repository.PersonRepository;
import com.softneta.service.PatientService;
import com.softneta.utilities.UtilityMethods;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class PatientServiceImpl implements PatientService {
	
    private final PersonRepository personRepository;

    @Autowired
    public PatientServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public ResponseObject createPatient(PatientEntity patientEntity) {
        boolean isPeripheralValid;
        ResponseObject responseObject;
        try {
            isPeripheralValid = this.isPeripheralCrossBoundary(patientEntity);
            if (!isPeripheralValid) {
                patientEntity = this.personRepository.save(patientEntity);
                responseObject = UtilityMethods.buildResponseObject(patientEntity,
                        MessageConstant.SUCCESSFULLY_CREATED,
                        HttpStatus.OK);
            } else {
                responseObject = UtilityMethods.buildResponseObject(patientEntity,
                        "",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            log.error("createGateWay method got exception ->", ex);
            responseObject = UtilityMethods.buildResponseObject(null,
                    MessageConstant.FAILED_TO_CREATE,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseObject;
    }

    @Override
    public ResponseObject updatePatient(PatientEntity patientEntity) {
        PatientEntity updatedPatientEntity;
        boolean isPeripheralValid;
        ResponseObject responseObject;
        try {
            isPeripheralValid = this.isPeripheralCrossBoundary(patientEntity);
            if (!isPeripheralValid) {
                updatedPatientEntity = this.personRepository.save(patientEntity);
                responseObject = UtilityMethods.buildResponseObject(updatedPatientEntity,
                        MessageConstant.SUCCESSFULLY_UPDATED,
                        HttpStatus.OK);
            } else {
                responseObject = UtilityMethods.buildResponseObject(patientEntity,
                        "MessageConstant.PERIPHERAL_CROSS_BOUNDARY",
                        HttpStatus.BAD_REQUEST);
            }

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
        Optional<PatientEntity> gatewayEntity;
        ResponseObject responseObject;
        try {
            gatewayEntity = this.personRepository.findById(id);
            if (gatewayEntity.isPresent()) {
                responseObject = UtilityMethods.buildResponseObject(gatewayEntity,
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
        try {
            List<PatientEntity> gatewayEntities = this.personRepository.findAll();
            responseObject = UtilityMethods.buildResponseObject(gatewayEntities,
                    MessageConstant.SUCCESSFULLY_GET_ALL,
                    HttpStatus.OK);

        } catch (Exception ex) {
            log.error("getAllTodo method got exception ->", ex);
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
            this.personRepository.deleteById(id);
            responseObject = UtilityMethods.buildResponseObject(null,
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

    private boolean isPeripheralCrossBoundary(PatientEntity patientEntity) {
        List<StudyEntity> studyEntityList;
        studyEntityList = patientEntity.getStudyList();
        if (studyEntityList.size() > 10) {
            return true;
        } else {
            return false;
        }
    }
}
