export interface Diagnosis {
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

export type Entry =  HospitalEntry | OccupationalHealthcare | HealthCheck; 

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}
