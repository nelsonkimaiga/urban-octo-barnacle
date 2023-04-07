package com.intellisoft.controller;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;
import com.intellisoft.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.MediaType.ALL_VALUE;


@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "intellisoft", produces = "application/json")
public class PatientController {

    @Autowired
    PatientService patientService;

    @Operation(summary = "Register New Patient")
    @PostMapping(path = "/register", consumes = ALL_VALUE)
    public ResponseEntity<Patient> registerPatient(@Valid @RequestBody Patient patient) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.registerPatient(patient));
    }

    @Operation(summary = "Save Patient Visit")
    @PostMapping(path = "/save-visit", consumes = ALL_VALUE)
    public ResponseEntity<PatientVisits> saveVisit(@Valid @RequestBody PatientVisits patientVisits) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.saveVisit(patientVisits));
    }

    @Operation(summary = "Get All Registered Patients")
    @GetMapping(path = "/fetch-patients", consumes = ALL_VALUE)
    public ResponseEntity<Iterable<Patient>> fetchPatients() {
        return ResponseEntity.status(HttpStatus.FOUND).body(patientService.fetchPatients());
    }

    @Operation(summary = "Get Patient Report")
    @GetMapping(path = "/visits/{patientNumber}", consumes = ALL_VALUE)
    public ResponseEntity<List<PatientVisits>> getPatientVisits(@PathVariable String patientNumber) {
        return ResponseEntity.status(HttpStatus.FOUND).body(patientService.fetchVisits(patientNumber));
    }
}
