import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Users from './users/users'
import Services from "./services/services";
import UsersByService from "./usersByService/usersByService";
import PriceOnService from "./pricesOnSevices/pricesOnServices";

ReactDOM.render(
    <>
        <Users />
        <Services />
        <UsersByService />
        <PriceOnService />
    </>,
    document.getElementById('root')
);
