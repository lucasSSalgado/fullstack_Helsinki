import diagnosesData from '../../data/diagnoses';
import { Diagnoses } from '../types';

const getDiagnores = (): Diagnoses[] => {
  return diagnosesData;
};

export default {
  getDiagnores,
};