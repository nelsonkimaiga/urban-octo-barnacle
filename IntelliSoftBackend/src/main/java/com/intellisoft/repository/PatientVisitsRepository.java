package com.intellisoft.repository;


import com.intellisoft.models.Patient;
import com.intellisoft.models.PatientVisits;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientVisitsRepository extends CrudRepository<PatientVisits, Long> {

    @Query("SELECT p FROM PatientVisits p WHERE p.patientNumber = :patientNumber")
    List<PatientVisits> findByPatientNumber(@Param("patientNumber") String patientNumber);

}
