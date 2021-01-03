import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './components/pages/Login';

function Routes() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Router>
                <Route path="/" exact component={ Login } />
                <Route path="/e" exact component={() => { return <>OII</> }} />
            </Router>
        </Suspense>
    );
}

export default Routes;
