import React from 'react';
import { SeleccAppBar } from './SeleccAppBar';


export const Seleccion = () => {
    return (
        <div className="notes__main-content">
        <SeleccAppBar/>
        <br/>
            <a
                className="btn btn-secondary mt-2"
                href="/selecopcion"
            >
                Reporte de Clientes
            </a>
            <br />
            <a
                className="btn btn-secondary mt-2"
                href="/selecopcion"
            >
                Reporte de Ventas
            </a>
            <br />
            <a
                className="btn btn-secondary mt-2"
                href="/selecopcion"
            >
                Reporte de Solicitudes
            </a>
        </div>
    )
}