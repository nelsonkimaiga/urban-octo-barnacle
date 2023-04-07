package com.intellisoft.service;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;

import java.util.List;

public interface PatientService {

    Patient registerPatient(Patient patient);

    PatientVisits saveVisit(PatientVisits patientVisits);
    Iterable<Patient> fetchPatients();

    List<PatientVisits> fetchVisits(String patientNumber);
}
