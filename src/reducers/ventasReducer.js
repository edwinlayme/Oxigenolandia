/*
    {
        ventas: [],
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
    ventas: [],
    active: null
}


export const ventasReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ventasActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.ventasAddNew:
            return {
                ...state,
                ventas: [action.payload, ...state.ventas]
            }

        case types.ventasLoad:
            return {
                ...state,
                ventas: [...action.payload]
            }

        case types.ventasUpdated:
            return {
                ...state,
                ventas: state.ventas.map(
                    venta => venta.id === action.payload.id
                        ? action.payload.venta
                        : venta
                )
            }

        case types.ventasDelete:
            return {
                ...state,
                active: null,
                ventas: state.ventas.filter(venta => venta.id !== action.payload)
            }

        case types.ventasLogoutCleaning:
            return {
                ...state,
                active: null,
                ventas: []
            }

        default:
            return state
    }


}