export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: Array<string>;
    description: string;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

interface OccupationalHealthcare extends BaseEntry {
    type: 'OccupationalHealthcare';
    sickLeave: {
        startDate: string;
        endDate: string;
    };
    employerName: string;
}

interface HealthCheck extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: number;
}

export type Entry = BaseEntry | HospitalEntry | OccupationalHealthcare | HealthCheck; 

export interface PatientsTypes {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Array<Entry>;
}

export type NewPatientTypes = Omit<PatientsTypes, 'id'>;

export type NonSensitivePatientData = Omit<PatientsTypes, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
}
