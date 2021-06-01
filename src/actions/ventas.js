import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadVentas } from '../helpers/loadVentas';
import { fileUpload } from '../helpers/fileUpload';


export const startNewVenta = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newVenta = {
            detalleventa: '',
            cantidad: '',
            idcliente: '',
            nombrecliente: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/oxigendb/venta`).add(newVenta);

        dispatch(activeVenta(doc.id, newVenta));
        dispatch(addNewVenta(doc.id, newVenta));

    }
}

export const activeVenta = (id, venta) => ({
    type: types.ventasActive,
    payload: {
        id,
        ...venta
    }
});

export const addNewVenta = (id, venta) => ({
    type: types.ventasAddNew,
    payload: {
        id, ...venta
    }
})


export const startLoadingVentas = (uid) => {
    return async (dispatch) => {

        const ventas = await loadVentas(uid);
        dispatch(setVentas(ventas));

    }
}


export const setVentas = (ventas) => ({
    type: types.ventasLoad,
    payload: ventas
});


export const startSaveVenta = (venta) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!venta.url) {
            delete venta.url;
        }

        const ventaToFirestore = { ...venta };
        delete ventaToFirestore.id;

        await db.doc(`${uid}/oxigendb/venta/${venta.id}`).update(ventaToFirestore);

        dispatch(refreshVenta(venta.id, ventaToFirestore));
        Swal.fire('Venta Almacenada Correctamente..', venta.id, 'success');
    }
}

export const refreshVenta = (id, venta) => ({
    type: types.ventasUpdated,
    payload: {
        id,
        venta: {
            id,
            ...venta
        }
    }
});


export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeVenta } = getState().ventas;

        Swal.fire({
            title: 'Actualizando...',
            text: 'Espere...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeVenta.url = fileUrl;

        dispatch(startSaveVenta(activeVenta))


        Swal.close();
    }
}


export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        await db.doc(`${uid}/oxigendb/venta/${id}`).delete();

        dispatch(deleteVenta(id));
        Swal.fire('Venta Eliminada..', id, 'success');
    }
}

export const deleteVenta = (id) => ({
    type: types.ventasDelete,
    payload: id
});


export const ventaLogout = () => ({
    type: types.ventasLogoutCleaning
});
