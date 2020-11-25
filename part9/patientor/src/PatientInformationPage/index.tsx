import React from 'react';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Patient, EntryFormType, Entry } from '../types';
import { setPatient } from '../state';
import EntryDetails from '../components/EntryDetails';
import EntryForm from './EntryForm';

const PatientInformationPage: React.FC = () => {

    const [{ patient, diagnosis }, dispatch ] = useStateValue();
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
    },[dispatch]);

    const onSubmit = async (values: Omit<EntryFormType, 'id'>) => {
        try {
            const sendValues = {...values, id: Math.floor(Math.random() * 100000000000000)};
            const { data: entryFromApi } = await axios.post<Entry>(`${apiBaseUrl}/${id}/entries`, sendValues);
            console.log(entryFromApi);
            console.log(values);
        } catch (error) {
            console.error(error);
        }
    };

    const displayPatientData = (patient: Patient) => {
        return (
            <div>
                <h1>{patient.name}</h1>
                <EntryForm onSubmit={onSubmit} diagnosis={diagnosis}/>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h1>entries</h1>
                {patient.entries.map(entry => (
                    <div key={entry.id}>
                        <EntryDetails entry={entry} />
                        <p>{entry.description}</p>
                        {entry.diagnosisCodes?.map(code => {
                            const codeResponse = diagnosis?.find(diag => diag.code === code);
                            return (
                                <p key={code}>{`${code} ${codeResponse?.name}`}</p>
                            );
                        })}
                    </div>    
                ))}
            </div>
        );
    };

    return (
        <div>
            {patient ?  displayPatientData(patient) : ''}
        </div>
    );
};

export default PatientInformationPage;