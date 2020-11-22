export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientsTypes {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NewPatientTypes = Omit<PatientsTypes, 'id'>;

export type NonSensitivePatientData = Omit<PatientsTypes, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
}
