import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SolicitudesAppBar } from './SolicitudesAppBar';
import { useForm } from '../../hooks/useForm';
import { startSaveSolicitud, startDeleting, activeSolicitud } from '../../actions/solicitudes';

export const SolicitudsScreen = () => {

    const dispatch = useDispatch();
    const { active: solicitud } = useSelector(state => state.solicitudes);
    const [formValues, handleInputChange, reset] = useForm(solicitud);
    const { idcliente, nombrecliente, cantidad, id } = formValues;

    const activeId = useRef(solicitud.id);
    const { active } = useSelector(state => state.solicitudes);

    const handleSolicitudSave = () => {
        dispatch(startSaveSolicitud(active));
    }

    useEffect(() => {

        if (solicitud.id !== activeId.current) {
            reset(solicitud);
            activeId.current = solicitud.id
        }

    }, [solicitud, reset])

    useEffect(() => {

        dispatch(activeSolicitud(formValues.id, { ...formValues }));

    }, [formValues, dispatch])


    const handleSolicitudDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <SolicitudesAppBar />

            <div className="notes__content">
                <label>Cantidad Solicitada:</label>
                <input
                    type="text"
                    placeholder="Solicitud Cantidad"
                    className="notes__title-input"
                    autoComplete="off"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleInputChange}
                />
                <hr />
                <label>Nombre/Razon Social Cliente:</label>
                <input
                    placeholder="Nombre o  Razon Social"
                    className="notes__title-input"
                    name="nombrecliente"
                    value={nombrecliente}
                    onChange={handleInputChange}
                />
                <hr />
                <label>ID cliente:</label>
                <input
                    placeholder="id_cliente"
                    className="notes__title-input"
                    name="idcliente"
                    value={idcliente}
                    onChange={handleInputChange}
                />

                {
                    (solicitud.url)
                    && (
                        <div className="notes__image">
                            <img
                                src={solicitud.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>

            <button
                className="btn btn-primary"
                onClick={handleSolicitudSave}
            >
                Guardar Solicitud
            </button>
            <button
                className="btn btn-danger"
                onClick={handleSolicitudDelete}
            >
                Eliminar
            </button>
        </div>
    )
}
