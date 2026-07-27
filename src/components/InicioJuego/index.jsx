import { useState } from 'react'
import { OpcionesValidas } from '../../Types/inicioType'
import { Reducer } from '../../reduce/TotitoReduce';
import { Inicio } from '../../Types/inicioType';
import './style.css'
import React from 'react';
import { TotitoContext } from '../../context';

const InicioJuego = () => {
    const { dispatch, state } = React.useContext(TotitoContext)

    const OnClick = (event) => {
        if (event.target.id > 0 && event.target.id <= 3) {
            dispatch({ type: Inicio.seleccionar, payload: { opcionInicio: parseInt(event.target.id) } })
            alert(`Selecciono la opcion ${event.target.id}`)
        } else {
            alert('Seleccione una funcion valida')
        }
    }

    return (
        <>
            <div className="game-container">
                <div className="header-container">
                    <h1 className="game-title">Totito</h1>
                    <p className="game-subtitle">Elige tu modo de juego para comenzar</p>
                </div>

                <div className="cards-container">

                    <div className="game-card">
                        <div className="icon-circle icon-hvsh">
                            👥
                        </div>
                        <h2 className="card-title">Humano vs Humano</h2>
                        <p className="card-description">
                            Juega contra un amigo en el mismo dispositivo por turnos.
                        </p>
                        <button id='1' className="card-button"
                            onClick={OnClick}
                        >Seleccionar</button>
                    </div>

                    <div className="game-card">
                        <div className="icon-circle icon-hvsai">
                            🤖
                        </div>
                        <h2 className="card-title">Humano vs AI</h2>
                        <p className="card-description">
                            Pon a prueba tus habilidades contra la inteligencia artificial.
                        </p>
                        <button id='2' className="card-button"
                            onClick={OnClick}
                        >Seleccionar</button>
                    </div>

                    <div className="game-card">
                        <div className="icon-circle icon-aivsai">
                            ⚡
                        </div>
                        <h2 className="card-title">AI vs AI</h2>
                        <p className="card-description">
                            Siéntate, relájate y observa a dos inteligencias artificiales competir.
                        </p>
                        <button id='3' className="card-button"
                            onClick={OnClick}
                        >Seleccionar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { InicioJuego }