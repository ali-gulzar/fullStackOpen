import React from 'react';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';
import { setPatient } from '../state';

const PatientInformationPage: React.FC = () => {

    const [{ patient }, dispatch ] = useStateValue();
    const { id } = useParams<{id: string}>();

    React.useEffect(() => {
        const patientById = async (id: string) => {
            try {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatient(patientFromApi));
            } catch (e) {
            console.error(e);
            }
        };
        if (patient?.id !== id) patientById(id);
    },[]);

    return (
        <div>
            {patient ?
                <div>
                    <h1>{patient.name}</h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </div> : ''}
        </div>
    );
};

export default PatientInformationPage;