import React from 'react';
import { ContentType } from '../types';

const Total: React.FC<ContentType> = ({ courseParts }) => {
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total;