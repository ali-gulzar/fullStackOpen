/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { NewPatientTypes } from '../types';

import { Gender, NewPatientTypes } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (text: any): text is Gender => {
    return Object.values(Gender).includes(text);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing name ${String(text)}`);
    }
    return String(text);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDateOfBirth = (dateofBirth: any): string => {
    if (!dateofBirth || !isDate(dateofBirth) || !isString(dateofBirth)) {
        throw new Error(`Incorrect or missing dateOfBirth ${String(dateofBirth)}`);
    }
    return String(dateofBirth);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender) || !isString(gender)) {
        throw new Error(`Incorrect or missing gender ${String(gender)}`);
    }
    return String(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation ${String(occupation)}`);
    }
    return String(occupation);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ss ${String(ssn)}`);
    }
    return String(ssn);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (values: any): NewPatientTypes => {
    return {
        name: parseName(values.name),
        dateOfBirth: parseDateOfBirth(values.dateOfBirth),
        ssn: parseSSN(values.ssn),
        gender: parseGender(values.gender),
        occupation: parseOccupation(values.occupation)
    };
};

export default {
    toNewPatient
};