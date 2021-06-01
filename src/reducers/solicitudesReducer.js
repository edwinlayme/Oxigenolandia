/*
    {
        solicitudes: [],
        active: null,
        active: {
            id: 'KASKLDJALKSDJ129387123',
            title: '',
            body: '',
            imageUrl: '',
            date: 12387612387126
        }
    }
*/

import { types } from '../types/types';

const initialState = {
    solicitudes: [],
    active: null
}


export const solicitudesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.solicitudesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.solicitudesAddNew:
            return {
                ...state,
                solicitudes: [action.payload, ...state.solicitudes]
            }

        case types.solicitudesLoad:
            return {
                ...state,
                solicitudes: [...action.payload]
            }

        case types.solicitudesUpdated:
            return {
                ...state,
                solicitudes: state.solicitudes.map(
                    solicitud => solicitud.id === action.payload.id
                        ? action.payload.solicitud
                        : solicitud
                )
            }

        case types.solicitudesDelete:
            return {
                ...state,
                active: null,
                solicitudes: state.solicitudes.filter(solicitud => solicitud.id !== action.payload)
            }

        case types.solicitudesLogoutCleaning:
            return {
                ...state,
                active: null,
                solicitudes: []
            }

        default:
            return state
    }


}