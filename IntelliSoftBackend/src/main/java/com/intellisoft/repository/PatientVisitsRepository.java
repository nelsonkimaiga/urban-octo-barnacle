package com.intellisoft.repository;


import com.intellisoft.models.PatientVisits;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientVisitsRepository extends CrudRepository<PatientVisits, Long> {

}
