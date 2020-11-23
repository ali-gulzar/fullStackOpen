import express from 'express';
import patientService from '../services/patientsService';
import { NewPatientTypes } from '../types';
import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatients());
});

patientRouter.get('/:id', (req, res) => {
    res.json(patientService.getOnePatient(req.params.id));
});

patientRouter.post('/', (req, res) => {
    const entry: NewPatientTypes = utils.toNewPatient(req.body);
    const newPatient = patientService.addNewPatient(entry);
    res.json(newPatient);
});

export default patientRouter;