import React from 'react';
import './Juego.css'
import { TotitoContext } from '../../context';

const Juego = () => {
    const { state, MarcarHumano, RevisarGanador, TirarAI, Reiniciar } = React.useContext(TotitoContext)

    const [bloqueo, setBloqueo] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('Empate')
    const [bloqueoInterfaz, setBloqueoInterfaz] = React.useState(false)

    const recibirTiro = async () => {
        setBloqueo(true)
        let posicion = await TirarAI(state.tablero, state.turno)
        MarcarHumano(posicion)
        setBloqueo(false)
    }

    const marcar = async () => {
        setBloqueo(true)
        let posicion2 = await TirarAI(state.tablero, state.turno)
        MarcarHumano(posicion2)
    }

    React.useEffect(() => {
        const { isGanadorX, isGanadorO } = RevisarGanador()

        if (((isGanadorO || isGanadorX) && bloqueoInterfaz != true) || state.tablero.every(item => item != undefined)) {
            setBloqueo(true)
            setBloqueoInterfaz(true)
            setMensaje(isGanadorX ? 'El Ganador es el Jugador 1' : isGanadorO ? 'El Ganador es el Jugador 2' : 'Hay un Empate')
        }

        if (state.opcionInicio == 2) {
            if (state.turno === "O" && !isGanadorO && !isGanadorX && state.tablero.some(item => item == undefined)) {
                recibirTiro()
            }
        }

        if (state.opcionInicio == 3) {
            if (isGanadorO || isGanadorX) {
                console.log('SE ENCONTRO UN GANADOR')
            }
            if (!isGanadorO && !isGanadorX && state.tablero.some(item => item == undefined)) {
                marcar()
            }
        }

    }, [state.tablero, bloqueoInterfaz])

    return (
        <div className="game-container">
            <h1 className="title">TOTITO</h1>

            <div className="status-board">
                <div className={`player player-x ${state.turno == 'X' && 'active'}`}>
                    <span className="symbol">X</span>
                    <span className="label">Jugador 1</span>
                </div>
                <div className="vs">VS</div>
                <div className={`player player-o ${state.turno == "O" && 'active'}`}>
                    <span className="symbol">O</span>
                    <span className="label">Jugador 2</span>
                </div>
            </div>

            {bloqueoInterfaz &&
                <p className='ganadorTotito'> {mensaje} </p>}
            {
                bloqueo && !bloqueoInterfaz && <p className='ganadorTotito'>Pensando...</p>
            }

            <div className="board" id="board">

                <button className={`cell ${state.tablero[0]}`} data-cell
                    disabled={state.tablero[0] || bloqueo}
                    onClick={() => MarcarHumano(0)}
                > {state.tablero[0] != undefined && state.tablero[0]}</button>

                <button className={`cell ${state.tablero[1]}`} data-cell
                    disabled={state.tablero[1] || bloqueo}
                    onClick={() => MarcarHumano(1)}
                > {state.tablero[1] != undefined && state.tablero[1]} </button>

                <button className={`cell ${state.tablero[2]}`} data-cell
                    disabled={state.tablero[2] || bloqueo}
                    onClick={() => MarcarHumano(2)}
                > {state.tablero[2] != undefined && state.tablero[2]} </button>


                <button className={`cell ${state.tablero[3]}`} data-cell
                    disabled={state.tablero[3] || bloqueo}
                    onClick={() => MarcarHumano(3)}
                > {state.tablero[3] != undefined && state.tablero[3]} </button>

                <button className={`cell ${state.tablero[4]}`} data-cell
                    disabled={state.tablero[4] || bloqueo}
                    onClick={() => MarcarHumano(4)}
                > {state.tablero[4] != undefined && state.tablero[4]} </button>

                <button className={`cell ${state.tablero[5]}`} data-cell
                    disabled={state.tablero[5] || bloqueo}
                    onClick={() => MarcarHumano(5)}
                > {state.tablero[5] != undefined && state.tablero[5]} </button>


                <button className={`cell ${state.tablero[6]}`} data-cell
                    disabled={state.tablero[6] || bloqueo}
                    onClick={() => MarcarHumano(6)}
                > {state.tablero[6] != undefined && state.tablero[6]} </button>

                <button className={`cell ${state.tablero[7]}`} data-cell
                    disabled={state.tablero[7] || bloqueo}
                    onClick={() => MarcarHumano(7)}
                > {state.tablero[7] != undefined && state.tablero[7]} </button>

                <button className={`cell ${state.tablero[8]}`} data-cell
                    disabled={state.tablero[8] || bloqueo}
                    onClick={() => MarcarHumano(8)}
                > {state.tablero[8] != undefined && state.tablero[8]} </button>
            </div>

            <div className="actions">
                {/* <button className="btn btn-secondary">Volver al Menú</button> */}
                <button className="btn btn-primary" onClick={() => {
                    Reiniciar()
                    setBloqueo(false)
                    setMensaje('')
                    setBloqueoInterfaz(false)
                }}>Reiniciar</button>
            </div>
        </div >
    );
}

export { Juego }