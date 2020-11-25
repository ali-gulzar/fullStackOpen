import express from 'express';
import patientService from '../services/patientsService';
import { Entry, NewPatientTypes } from '../types';
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

patientRouter.post('/:id/entries', (req, res) => {
    const values: Entry = req.body as Entry;
    const entry = patientService.addNewEntry(values, req.params.id);
    if (entry) return res.json(entry);
    return res.status(400).json({ error: 'Invalid entry' });
});

export default patientRouter;