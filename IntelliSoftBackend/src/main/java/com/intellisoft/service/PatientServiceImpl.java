package com.intellisoft.service;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;
import com.intellisoft.repository.PatientRepository;
import com.intellisoft.repository.PatientVisitsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    PatientVisitsRepository patientVisitsRepository;

    @Override
    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public PatientVisits saveVisit(PatientVisits patientVisits) {
        return patientVisitsRepository.save(patientVisits);
    }
}
