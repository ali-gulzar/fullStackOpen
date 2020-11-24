import React from 'react';
import { Entry } from '../types';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return (
                <Icon name="hospital" size="big"/>
            );
        case "OccupationalHealthcare":
            return (
                <Icon name="doctor" size="big"/>
            );
        case "HealthCheck":
            return (
                <Icon name="heart outline" size="big"/>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;