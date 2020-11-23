export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {}

export interface PatientsTypes {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NewPatientTypes = Omit<PatientsTypes, 'id'>;

export type NonSensitivePatientData = Omit<PatientsTypes, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
}
