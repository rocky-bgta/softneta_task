/**
 * Created By: Md. Nazmus Salahin
 * Created Date:  25-May-2021
 * Time: 5:26 AM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.service;


import com.softneta.core.ResponseObject;
import com.softneta.entities.PatientEntity;

import java.util.UUID;

public interface PatientService {
	ResponseObject createPatient(PatientEntity patientEntity);
	ResponseObject updatePatient(PatientEntity gateWayModel);
	ResponseObject getPatientById(UUID id);
	ResponseObject getAllPatientInfo();
	ResponseObject deletePatientById(UUID id);
}
