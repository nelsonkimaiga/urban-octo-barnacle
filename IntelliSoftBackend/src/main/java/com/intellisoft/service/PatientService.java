package com.intellisoft.service;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;

public interface PatientService {

    Patient registerPatient(Patient patient);

    PatientVisits saveVisit(PatientVisits patientVisits);
}
