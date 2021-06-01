import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote, startSaveNote, startUploading, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { nit, categoria, fono, direccion, nombrecliente, id } = formValues;

    const activeId = useRef(note.id);
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch])


    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <label>Nombre/Razon Social:</label>
                <input
                    type="text"
                    placeholder="Nombre Cliente"
                    className="notes__title-input"
                    autoComplete="off"
                    name="nombrecliente"
                    value={nombrecliente}
                    onChange={handleInputChange}
                />
                <hr />
                <label>Dirección:</label>
                <input
                    placeholder="Direccion"
                    className="notes__title-input"
                    name="direccion"
                    value={direccion}
                    onChange={handleInputChange}
                />
                <hr />
                <label>Fono:</label>
                <input
                    placeholder="Teléfono/Cel."
                    className="notes__title-input"
                    name="fono"
                    value={fono}
                    onChange={handleInputChange}
                />
                <hr />
                <label>Nit:</label>
                <input
                    placeholder="NIT/CI"
                    className="notes__title-input"
                    name="nit"
                    value={nit}
                    onChange={handleInputChange}
                />
                <label>Categoria:</label>
                <select name="categoria"
                    value={categoria}
                    form="form"
                    className="notes__title-input"
                    onChange={handleInputChange}>
                    <option value="Centro de Salud">Centro de Salud</option>
                    <option value="Empresa">Empresa u Organizacion</option>
                    <option value="Particular">Persona Particular</option>
                </select>

                {
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>

            <button
                className="btn btn-primary"
                onClick={handleSave}
            >
                Guardar
            </button>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Eliminar
            </button>

        </div>
    )
}
