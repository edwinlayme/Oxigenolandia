import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const VentasAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
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
            <span ><b>Adicionar Venta</b></span>

        </div >
    )
}
