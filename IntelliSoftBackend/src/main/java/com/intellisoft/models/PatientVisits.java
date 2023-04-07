package com.intellisoft.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

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
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    Date visitDate;
    @Column
    String patientNumber;
    @Column
    String patientName;
    @Column
    String bmiStatus;
    @Column
    String age;
    @Column
    String healthStatus;
    @Column
    String takingDrugs;

    @Column
    Boolean isDieting;

}
