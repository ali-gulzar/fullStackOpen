import patientData from '../data/patient';
import { NonSensitivePatientData, PatientsTypes, NewPatientTypes, Entry } from '../types';

const patients: Array<PatientsTypes> = patientData;

const getPatients = (): PatientsTypes[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getOnePatient = (id: string): NonSensitivePatientData | undefined => {
    return patients.find(patient => patient.id === id);
};

const addNewPatient = (entry: NewPatientTypes ): PatientsTypes => {
    const newPatient = {
        id: String(Math.max(...patients.map(p => Number(p.id))) + 1),
        ...entry,
    };
    patients.push(newPatient);
    return newPatient;
};

const addNewEntry = (entry: Entry, id: string): Entry | undefined => {
    const patient = patients.find(patient => patient.id === id);
    if (patient) {
        patient.entries = patient.entries.concat(entry);
        return entry;
    }
    return undefined;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addNewPatient,
    getOnePatient,
    addNewEntry
};