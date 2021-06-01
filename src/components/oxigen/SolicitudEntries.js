import React from 'react'
import { useSelector } from 'react-redux';
import { SolicitudEntry } from './SolicitudEntry';

export const SolicitudEntries = () => {

    const { solicitudes } = useSelector(state => state.solicitudes);

    return (
        <div className="journal__entries">

            {
                solicitudes.map(solicitud => (
                    <SolicitudEntry
                        key={solicitud.id}
                        {...solicitud}
                    />
                ))
            }

        </div>
    )
}
