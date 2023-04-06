package com.intellisoft.controller;

import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;
import com.intellisoft.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

import static org.springframework.http.MediaType.ALL_VALUE;


@Controller
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
}
