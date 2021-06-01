import React from 'react'
import { useSelector } from 'react-redux';
import { VentaEntry } from './VentaEntry';

export const VentaEntries = () => {

    const { ventas } = useSelector(state => state.ventas);

    return (
        <div className="journal__entries">

            {
                ventas.map(venta => (
                    <VentaEntry
                        key={venta.id}
                        {...venta}
                    />
                ))
            }

        </div>
    )
}
