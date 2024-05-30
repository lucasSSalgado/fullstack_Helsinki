import express from 'express';
import patientsService from '../services/patients';
import toNewPatient, { parseNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientBydId(id);
  if (!patient) return res.sendStatus(404);
  return res.send(patient);
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientBydId(id);
  if (!patient) return res.sendStatus(404);

  try {
    const newEntry = parseNewEntry(req.body);
    const addedEntry = patientsService.addEntry(id, newEntry);
    return res.send(addedEntry);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
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