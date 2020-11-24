import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnsis } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInformationPage from "./PatientInformationPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnsis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosisList();
    fetchPatientList();
  }, [dispatch]);

  // const patientById = async (id: string) => {
  //   try {
  //     const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  //     dispatch({ type: "SET_PATIENT", payload: patientFromApi});
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useRouteMatch('/:id');

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id" render={() => <PatientInformationPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
    </div>
  );
};

export default App;
