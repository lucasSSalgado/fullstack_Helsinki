import patientsData from '../../data/patients';
import { NewPatient, PublicPatient } from '../types';
import { v1 as uuid  } from 'uuid';
import toNewPatient from '../utils';

const getPatientsWithoutSSN = (): PublicPatient[] => {
  const genderPatients = patientsData.map(obj => {
    const patientGender = toNewPatient(obj);
    return {
      id: obj.id,
      ...patientGender
    };
  });

  return genderPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation  
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

export default {
    getPatientsWithoutSSN,
    addPatient
};