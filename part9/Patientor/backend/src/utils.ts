import { NewPatient, Gender, Diagnosis, Entry, HealthCheckRating, EntryWithoutId } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        const newEntry: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender), 
            occupation: parseOccupation(object.occupation),
            entries: []
        };
      
        return newEntry;
      }

    throw new Error('Incorrect data: a field missing');
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name: unknown): string => {
    if (!isString(name) ) {
        throw new Error('Incorrect name');
    }
    return name;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};
const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn: ' + ssn);
    }
    return ssn;
};
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation: ' + occupation);
    }
    return occupation;
};
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
};
const isEntry = (param: unknown): param is EntryWithoutId => {
    if (!param || typeof param !== 'object') {
        return false;
    }
    if ('type' in param && 'specialist' in param && 'date' in param && 'description' in param) {
        return true;
    }
    return false;
};
const isHealthCheck = (param: unknown): param is EntryWithoutId => { 
    if (!param || typeof param !== 'object') {
        return false;
    }
    if (!isEntry(param)) {
        return false;
    }

    const requiredKeys = ['type', 'specialist', 'date', 'description', 'healthCheckRating'];
    const paramKeys = Object.keys(param);

    const hasAllRequiredKeys = requiredKeys.every(key => paramKeys.includes(key));
    const hasNoExtraKeys = paramKeys.every(key => requiredKeys.includes(key));

    if (hasAllRequiredKeys && hasNoExtraKeys && fieldsNotEmpty(param)) {
        return true;
    }
    return false;
};
const isHospital = (param: unknown): param is EntryWithoutId => {
    if (!param || typeof param !== 'object') {
        return false;
    }

    if (!isEntry(param)) {
        return false;
    }

    const requiredKeys = ['type', 'specialist', 'date', 'description', 'discharge'];
    const paramKeys = Object.keys(param);

    const hasAllRequiredKeys = requiredKeys.every(key => paramKeys.includes(key));
    const hasNoExtraKeys = paramKeys.every(key => requiredKeys.includes(key));


    if (hasAllRequiredKeys && hasNoExtraKeys && fieldsNotEmpty(param)) {
        return true;
    }

    return false;
};
const isOccupationalHealthcare = (param: unknown): param is EntryWithoutId => {
    if (!param || typeof param !== 'object') {
        return false;
    }
    if (!isEntry(param)) {
        return false;
    }

    const requiredKeys = ['type', 'specialist', 'date', 'description', 'employerName'];
    const optionalKeys = ['diagnosisCodes', 'sickLeave'];
    const paramKeys = Object.keys(param);

    const hasAllRequiredKeys = requiredKeys.every(key => paramKeys.includes(key));
    const hasNoExtraKeys = paramKeys.every(key => requiredKeys.includes(key) || optionalKeys.includes(key));

    if (hasAllRequiredKeys && hasNoExtraKeys && fieldsNotEmpty(param)) {
        return true;
    }
    return false;
};
const fieldsNotEmpty = (entry: EntryWithoutId): boolean => {
    if (entry.description.length === 0) {
        return false;
    }

    if (entry.specialist.length === 0) {
        return false;
    }

    if (entry.date.length === 0) {
        return false;
    }

    if (entry.type.length === 0) {
        return false;
    }

    return true;
};
export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};
export const parseNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if (!('type' in object) || !isString(object.type) || !isEntry(object)) {
      throw new Error('Incorrect or missing data');
    }

    switch (object.type) {
        case 'HealthCheck':
            if (!('healthCheckRating' in object) || !isHealthCheckRating(object.healthCheckRating)) {
                throw new Error('Incorrect or missing data');
            }
            if (!isHealthCheck(object)) {
                throw new Error('Incorrect or missing data');
            }
            return object;
        case 'OccupationalHealthcare':
            if (!('employerName' in object) || !isString(object.employerName)) {
                throw new Error('Incorrect or missing data');
            }
            if (!isOccupationalHealthcare(object)) {
                throw new Error('Incorrect or missing data');
            }

            return object;
        case 'Hospital':
            if (!('discharge' in object) || !('date' in object.discharge) || !('criteria' in object.discharge) 
                || !isString(object.discharge.date) || !isString(object.discharge.criteria)) {
                throw new Error('Incorrect or missing data');
            }

            if (!isHospital(object)) {
                throw new Error('Incorrect or missing data');
            }
            return object;
    
        default:
            throw new Error('Incorrect or missing data');
    }
  
    return object as Entry;
};

export default toNewPatient;