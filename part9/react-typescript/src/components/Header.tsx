import React from 'react';
import { HeaderType } from '../types';

const Header: React.FC<HeaderType> = ({ courseName }) => {
    return (
        <h1>{courseName}</h1>
    )
}

export default Header;
