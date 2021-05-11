import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/contexts'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loggedIn, jwtToken } = useContext(UserContext)

    return (
        jwtToken
            ? <Route {...rest} component={ props => <Component {...rest} {...props} /> } />
            : <Redirect to='/' />
    )
}

export default ProtectedRoute;
