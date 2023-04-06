package com.intellisoft.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class PatientVisits {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    Date visitDate;
    Integer height;
    Integer weight;
    BigDecimal bmiCalculation;
    @Column
    String patientNumber;
}
