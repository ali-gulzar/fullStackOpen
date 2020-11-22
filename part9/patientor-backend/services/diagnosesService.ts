import diagnosesData from '../data/diagnoses.json';
import { DiagnosesType } from '../types';

const diagnoses: Array<DiagnosesType> = diagnosesData as Array<DiagnosesType>;

const getDiagnoses = (): DiagnosesType[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};