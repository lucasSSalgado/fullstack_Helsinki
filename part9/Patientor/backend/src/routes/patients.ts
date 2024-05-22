import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  try {
    const patientSanitized = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(patientSanitized);
  
    res.send(newPatient);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;