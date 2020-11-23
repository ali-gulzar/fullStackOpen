import patientData from '../data/patients.json';
import { NonSensitivePatientData, PatientsTypes, NewPatientTypes } from '../types';

const patients: Array<PatientsTypes> = patientData as Array<PatientsTypes>;

const getPatients = (): PatientsTypes[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: []
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