import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children, role}) => {
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (role && user.role !== role) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default PrivateRoute;