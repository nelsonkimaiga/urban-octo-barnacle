package com.intellisoft.service;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;
import com.intellisoft.repository.PatientRepository;
import com.intellisoft.repository.PatientVisitsRepository;
import com.intellisoft.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public Iterable<Patient> fetchPatients() {
        return patientRepository.findAll();
    }

    @Override
    public List<PatientVisits> fetchVisits(String patientNumber) {
        List<PatientVisits> visits = patientVisitsRepository.findByPatientNumber(patientNumber);
        if (!visits.isEmpty()) {
            return visits;
        } else {
            throw new ResourceNotFoundException("Patient Visit not found with patientNumber: " + patientNumber);
        }
    }

}
