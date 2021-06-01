import { db } from '../firebase/firebase-config';



export const loadSolicitudes = async (uid) => {

    const solicitudesSnap = await db.collection(`${uid}/oxigendb/solicitud`).get();
    const solicitudes = [];

    solicitudesSnap.forEach(snapHijo => {
        solicitudes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return solicitudes;
}