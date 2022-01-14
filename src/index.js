import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Users from './users/users'
import Services from "./services/services";

ReactDOM.render(
    <>
        <Users />
        <Services />
    </>,
    document.getElementById('root')
);
