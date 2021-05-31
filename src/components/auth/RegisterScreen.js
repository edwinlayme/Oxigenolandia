import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        lastname:'',
        email: '',
        fono: '',
        password: '',
        password2: '',
    });

    const { name,lastname,email ,fono,password ,password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError('Nombre requerido!') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Correo Invalido!') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Contraseña invalida! minimo 6 caracteres') )
            return false
        }
        
        dispatch( removeError() );
       return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }


                <input 
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input 
                    type="text"
                    placeholder="Apellidos"
                    name="lastname"
                    className="auth__input"
                    autoComplete="off"
                    value={ lastname }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Correo Electrónico"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Cel./Teléfono"
                    name="fono"
                    className="auth__input"
                    autoComplete="off"
                    value={ fono }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirmar Contraseña"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Registrar
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Retornar Inicio de Sesión?
                </Link>

            </form>
        </>
    )
}
