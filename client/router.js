import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'history';
import ProtectedRoute from 'hocs/ProtectedRoute';
import PersistRoute from 'hocs/PersistRoute';

import Authentication from 'components/Authentication';
import Animals from 'components/Animals';
import Navbar from 'components/Navbar';

const AppRouter = () => (
    <Router history={history}>
        <Fragment>
            <Navbar history={history} />
            <Switch>
                <Route path="/login" component={PersistRoute(Authentication)} />
                <Route path="/register" component={PersistRoute(Authentication)} />
                <Route exact path="/" component={ProtectedRoute(Animals)} />
            </Switch>
        </Fragment>
    </Router>
);


export default AppRouter;