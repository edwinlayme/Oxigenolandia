import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { VentasAppBar } from './VentasAppBar';
import { useForm } from '../../hooks/useForm';
import { activeVenta, startSaveVenta, startUploading, startDeleting } from '../../actions/ventas';

export const VentaScreen = () => {

    const dispatch = useDispatch();
    const { active: venta } = useSelector(state => state.ventas);
    const [formValues, handleInputChange, reset] = useForm(venta);
    const { nombrecliente, idcliente, cantidad, detalleventa, id } = formValues;

    const activeId = useRef(venta.id);
    const { active } = useSelector(state => state.ventas);

    const handleVentaSave = () => {
        dispatch(startSaveVenta(active));
    }

    useEffect(() => {

        if (venta.id !== activeId.current) {
            reset(venta);
            activeId.current = venta.id
        }

    }, [venta, reset])

    useEffect(() => {

        dispatch(activeVenta(formValues.id, { ...formValues }));

    }, [formValues, dispatch])


    const handleVentaDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <VentasAppBar />

            <div className="notes__content">
                <label>Detalle:</label>
                <input
                    type="text"
                    placeholder="Detalle Venta"
                    className="notes__title-input"
                    autoComplete="off"
                    name="detalleventa"
                    value={detalleventa}
                    onChange={handleInputChange}
                />
                <hr />
                <label>Cantidad:</label>
                <input
                    placeholder="Cantidad"
                    className="notes__title-input"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleInputChange}
                />
                <hr />

                <label>ID Cliente:</label>
                <input
                    placeholder="id_cliente"
                    className="notes__title-input"
                    name="idcliente"
                    value={idcliente}
                    onChange={handleInputChange}
                />
                <hr />

                <label>Nombre  Cliente:</label>
                <input
                    placeholder="Nombre del Cliente"
                    className="notes__title-input"
                    name="nombrecliente"
                    value={nombrecliente}
                    onChange={handleInputChange}
                />
                <hr />
            </div>

            <button
                className="btn btn-primary"
                onClick={handleVentaSave}
            >
                Almacenar Venta
            </button>
            <button
                className="btn btn-danger"
                onClick={handleVentaDelete}
            >
                Eliminar Venta
            </button>
        </div>
    )
}
