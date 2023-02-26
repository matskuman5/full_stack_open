import patients from '../../data/patients';

import { PatientWithoutSSN, Patient, NewPatientEntry } from '../types';

import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default getPatientsWithoutSSN;
