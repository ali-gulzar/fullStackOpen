import patientData from '../data/patient';
import { NonSensitivePatientData, PatientsTypes, NewPatientTypes } from '../types';

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

export default {
    getPatients,
    getNonSensitivePatients,
    addNewPatient,
    getOnePatient
};