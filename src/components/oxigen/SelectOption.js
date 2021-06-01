import React from 'react';
import { Sidebar } from './Sidebar';
import { Seleccion } from '../reportes/Seleccion';
import { NothingSelected } from '../oxigen/NothingSelected'
import { useSelector } from 'react-redux';


export const SelectOption = () => {

    const { active } = useSelector(state => state.ventas);


    return (
        <div
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >

            <Sidebar />

            <main>

                    <Seleccion />

            </main>


        </div>
    )
}