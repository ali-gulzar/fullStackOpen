import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryFormType, Diagnosis } from "../types";


interface Props {
  onSubmit: (values: Omit<EntryFormType, 'id'>) => void;
  diagnosis: Diagnosis[] | undefined;
}

export const EntryForm: React.FC<Props> = ({ onSubmit, diagnosis }) => {

  const diagnosisCodes = diagnosis?.map(diagnosis => diagnosis.code);
  console.log(diagnosisCodes);

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        diagnosisCodes: "",
        description: "",
        type: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.description = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.type) {
          errors.description = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="diagnosisCodes"
              placeholder="DiagnosisCodes"
              name="diagnosisCodes"
              setFieldValue={diagnosisCodes}
              setFieldTouched={diagnosisCodes}
              diagnoses={diagnosis}
              component={DiagnosisSelection}
            />
            <Field
              label="Type"
              placeholder="type"
              name="type"
              component={TextField}
            />
            <Field
              label="HealthRating"
              name="healthRating"
              max={10}
              min={1}
              component={NumberField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
