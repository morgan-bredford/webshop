import React from 'react';
import { StaticRouter as Router } from 'react-router-dom'
import App from '../client/App';

const ServerApp = ({ url, state }) => {
    return (
        <Router location={url}>
            <App state={state} />
        </Router>
    )
}

export default ServerApp