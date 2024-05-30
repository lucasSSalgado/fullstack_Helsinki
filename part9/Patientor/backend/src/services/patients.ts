import patientsData from '../../data/patients';
import { Entry, EntryWithoutId, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid  } from 'uuid';
import toNewPatient from '../utils';

const getPatientsWithoutSSN = (): PublicPatient[] => {
  const genderPatients = patientsData.map(obj => {
    const patientGender = toNewPatient(obj);

    return {
      id: obj.id,
      ...patientGender,
      entries: obj.entries
    };
  });

  return genderPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const id = uuid();
  const patientSanitized = toNewPatient(patient);
  const newPatient = {
    id,
    ...patientSanitized
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = patientsData.find(patient => patient.id === id);
  if (!patient) throw new Error('Patient not found');
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

const getPatientBydId = (id: string): Patient | undefined => {
  const patient = patientsData.find(patient => patient.id === id);
  if (!patient) return undefined;
  const patientSanitized = toNewPatient(patient);
  return {
    id: id,
    ...patientSanitized,
    entries: patient.entries
  };
};

export default {
    getPatientsWithoutSSN,
    addPatient,
    getPatientBydId,
    addEntry
};