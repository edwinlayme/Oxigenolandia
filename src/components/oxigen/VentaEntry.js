import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeVenta } from '../../actions/ventas';

export const VentaEntry = ({ id, detalleventa, cantidad, idcliente, nombrecliente, date,url }) => {

    const ventaDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(
            activeVenta(id, {
                date, detalleventa, cantidad, idcliente, nombrecliente, url
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
                    {detalleventa}
                </p>
                <p className="journal__entry-content">
                    {cantidad}
                </p>
                <p className="journal__entry-content">
                    {idcliente}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span> {ventaDate.format('dddd')} </span>
                <h4> {ventaDate.format('Do')} </h4>
            </div>

        </div>
    )
}
