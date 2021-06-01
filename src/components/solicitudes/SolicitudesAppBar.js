import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveSolicitud, startUploading } from '../../actions/solicitudes';

export const SolicitudesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSolicitudSave = () => {
        dispatch(startSaveSolicitud(active));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span ><b>Gestionar Solicitud</b></span>
            <p>Disponible: 245</p>
        </div >
    )
}
