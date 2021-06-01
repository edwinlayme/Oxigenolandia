import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeSolicitud } from '../../actions/solicitudes';

export const SolicitudEntry = ({ id, cantidad, date, nombrecliente, idcliente, url }) => {

    const solicitudDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(
            activeSolicitud(id, {
                date, cantidad, nombrecliente, idcliente, url
            })
        );
    }

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleEntryClick}
        >

            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
            <p className="journal__entry-title">
                    {nombrecliente}
                </p>
                <p className="journal__entry-title">
                    {id}
                </p>
                <p className="journal__entry-content">
                    {cantidad}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span> {solicitudDate.format('dddd')} </span>
                <h4> {solicitudDate.format('Do')} </h4>
            </div>

        </div>
    )
}
