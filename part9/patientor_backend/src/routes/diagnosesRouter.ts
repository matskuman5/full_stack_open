import express from 'express';
import getDiagnoses from '../services/diagnosisService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(getDiagnoses());
});

export default router;
