import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { direccion,fono,nombrecliente, id } = formValues;

    const activeId = useRef(note.id);

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
                <label>Direccion:</label>
                <input
                    placeholder="Direccion"
                    className="notes__title-input"
                    name="direccion"
                    value={direccion}
                    onChange={handleInputChange}
                />

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
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
