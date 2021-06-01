import React from 'react';
import { SidebarVentas } from './SidebarVentas';
import { VentaScreen } from '../ventas/VentaScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';


export const VentasScreen = () => {

    const { active } = useSelector(state => state.ventas);


    return (
        <div
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >

            <SidebarVentas />

            <main>

                {
                    (active)
                        ? (<VentaScreen />)
                        : (
                            <NothingSelected />)
                }

            </main>


        </div>
    )
}
