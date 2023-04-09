# IntelliSoft Hospital System

This is a simple web-app that will register a patient, manage new and subsequent visits for the patient and captures their vitals.

Stack used:

Back-end:
- Java & SpringBoot Framework
- Mysql

Front-End:
- ReactJs

# How to run:

- Clone the repo
- open the `IntelliSoftBackend` folder in your IntelliJ IDE
- build the gradle dependencies and run the application. 

The JAVA API application will run from port `8008` i.e: `http://localhost:8008/intellisoft/`

The endpoints defined in the `PatientController` class are:

- `http://localhost:8008/intellisoft/visits/register` - for patient registration
- `http://localhost:8008/intellisoft/visits/save-visit`- for saving visit details for first time visit
- `http://localhost:8008/intellisoft/visits/fetch-patients`- for fetching registered patients in order to handle ssubsequent visits
- `http://localhost:8008/intellisoft/visits/{patientNumber}`- for retrieving patient visit information using their `patientNumber`. This will feed the patient report.


For the front-end:

-open the `intellisoft-clientside` folder on your terminal
-run `npm install` from root of the folder
-run `npm start` and the application will run on port `3000` in your browser i.e: `http://localhost:3000/`
