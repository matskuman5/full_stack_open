import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  const patient: NewPatientEntry = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(patient);
  res.json(addedPatient);
});

export default router;
