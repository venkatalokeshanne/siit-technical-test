import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Users from './users/users'
import Services from "./services/services";
import UsersByService from "./usersByService/usersByService";

ReactDOM.render(
    <>
        <Users />
        <Services />
        <UsersByService />
    </>,
    document.getElementById('root')
);
