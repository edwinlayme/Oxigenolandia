import { db } from '../firebase/firebase-config';



export const loadVentas = async (uid) => {

    const ventasSnap = await db.collection(`${uid}/oxigendb/venta`).get();
    const ventas = [];

    ventasSnap.forEach(snapHijo => {
        ventas.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return ventas;
}