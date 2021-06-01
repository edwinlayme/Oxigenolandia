import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';
import { ventasReducer } from '../reducers/ventasReducer';
import { solicitudesReducer } from '../reducers/solicitudesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
    ventas: ventasReducer,
    solicitudes: solicitudesReducer
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);