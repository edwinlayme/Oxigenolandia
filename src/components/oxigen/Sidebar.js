import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ClienteEntries } from './ClienteEntries'
import { VentaEntries } from './VentaEntries'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { startNewVenta } from '../../actions/ventas';
import { startNewSolicitud } from '../../actions/solicitudes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }
    const handleAddNewVenta = () => {
        dispatch( startNewVenta() );
    }
    const handleAddNewSolicitud = () => {
        dispatch( startNewSolicitud() );
    }
    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-user"></i>
                    <span> { name }</span>
                </h3>

                <button 
                    className="btn btn-login"
                    onClick={ hanleLogout }
                >
                <i className="fas fa-power-off"></i>
                 Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNewVenta }
            >
                  <i className="fas fa-store"></i>
                <a className="mt-2" href="/venta">
                 Ventas
                </a>
            </div>
            <div 
            className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="fas fa-ad"></i>
                <a className="mt-2" href="/cliente">
                 Clientes
                </a>
            </div>
            <div 
            className="journal__new-entry"
                onClick={ handleAddNewSolicitud }
            >
                <i className="fas fa-ad"></i>
                <a className="mt-2" href="/solicitud">
                    Solicitudes
                </a>
            </div>
            <ClienteEntries/>  

        </aside>
    )
}
