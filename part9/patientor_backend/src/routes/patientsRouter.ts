import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  const patient: NewPatientEntry = req.body;
  const addedPatient = patientService.addPatient(patient);
  res.json(addedPatient);
});

export default router;
