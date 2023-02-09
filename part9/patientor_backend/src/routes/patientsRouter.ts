import express from 'express';
import getPatientsWithoutSSN from '../services/patientService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(getPatientsWithoutSSN());
});

export default router;
