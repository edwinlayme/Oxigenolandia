import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadSolicitudes } from '../helpers/loadSolicitudes';
import { fileUpload } from '../helpers/fileUpload';


export const startNewSolicitud = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newSolicitud = {
            cantidad: '',
            nombrecliente: '',
            idcliente: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/oxigendb/solicitud`).add(newSolicitud);

        dispatch(activeSolicitud(doc.id, newSolicitud));
        dispatch(addNewSolicitud(doc.id, newSolicitud));

    }
}

export const activeSolicitud = (id, solicitud) => ({
    type: types.solicitudesActive,
    payload: {
        id,
        ...solicitud
    }
});

export const addNewSolicitud = (id, solicitud) => ({
    type: types.solicitudesAddNew,
    payload: {
        id, ...solicitud
    }
})


export const startLoadingSolicitudes = (uid) => {
    return async (dispatch) => {

        const solicitudes = await loadSolicitudes(uid);
        dispatch(setSolicitudes(solicitudes));

    }
}


export const setSolicitudes = (solicitudes) => ({
    type: types.solicitudesLoad,
    payload: solicitudes
});


export const startSaveSolicitud = (solicitud) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!solicitud.url) {
            delete solicitud.url;
        }

        const solicitudToFirestore = { ...solicitud };
        delete solicitudToFirestore.id;

        await db.doc(`${uid}/oxigendb/solicitud/${solicitud.id}`).update(solicitudToFirestore);

        dispatch(refreshSolicitud(solicitud.id, solicitudToFirestore));
        Swal.fire('Solicitud Agregada..', solicitud.id, 'success');
    }
}

export const refreshSolicitud = (id, solicitud) => ({
    type: types.solicitudesUpdated,
    payload: {
        id,
        solicitud: {
            id,
            ...solicitud
        }
    }
});


export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeSolicitud } = getState().solicitudes;

        Swal.fire({
            title: 'Actualizando...',
            text: 'Espere...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeSolicitud.url = fileUrl;

        dispatch(startSaveSolicitud(activeSolicitud))


        Swal.close();
    }
}


export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        await db.doc(`${uid}/oxigendb/solicitud/${id}`).delete();

        dispatch(deleteSolicitud(id));
        Swal.fire('Solicitud Borrado..', id, 'success');
    }
}

export const deleteSolicitud = (id) => ({
    type: types.solicitudesDelete,
    payload: id
});


export const solicitudLogout = () => ({
    type: types.solicitudesLogoutCleaning
});
