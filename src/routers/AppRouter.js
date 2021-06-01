import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { ClienteScreen } from '../components/oxigen/Clientescreen';
import { VentasScreen } from '../components/oxigen/Ventascreen';
import { SolicitudScreen } from '../components/oxigen/SolicitudScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
import { SelectOption } from '../components/oxigen/SelectOption';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/venta"
                        component={VentasScreen}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/cliente"
                        component={ClienteScreen}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/solicitud"
                        component={SolicitudScreen}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/selecopcion"
                        component={SelectOption}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
