import React from 'react';
import { SidebarSolicitudes } from './SidebarSolicitudes';
import { SolicitudsScreen } from '../solicitudes/SolicitudsScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';


export const SolicitudScreen = () => {

    const { active } = useSelector(state => state.solicitudes);


    return (
        <div
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >

            <SidebarSolicitudes />

            <main>

                {
                    (active)
                        ? (<SolicitudsScreen />)
                        : (
                            <NothingSelected />)
                }

            </main>


        </div>
    )
}
