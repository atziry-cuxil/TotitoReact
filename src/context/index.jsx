import React from 'react';
import { Reducer } from '../reduce/TotitoReduce';
import { Inicio } from '../Types/inicioType';
import OpenAI from 'openai';

const TotitoContext = React.createContext()
const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const TotitoProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(Reducer, {
        opcionInicio: '',
        continuar: false,
        tablero: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        turno: 'X',
    })

    const ganadores = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const MarcarHumano = (index) => {
        dispatch({ type: Inicio.marcar, payload: { index, symbol: state.turno } })
    }

    const RevisarGanador = () => {
        const isGanadorX = ganadores.some(item => item.every(indice => state.tablero[indice] == "X"));
        const isGanadorO = ganadores.some(item => item.every(indice => state.tablero[indice] == "O"));
        return { isGanadorX, isGanadorO }
    }

    const promptSystem = `Eres el jugador O en un juego de Totito.
                            El tablero contiene 9 posiciones numeradas del 0 al 8.
                            Debes elegir únicamente una posición undefined.
                            Si la posicion no es undefined busca otra posicion.

                            Prioridades:
                        1. Ganar si existe una jugada ganadora.
                        2. Bloquear al jugador si puede ganar.
                        3. Elegir el centro.
                        4. Elegir una esquina.
                        5. Elegir cualquier posición disponible.
                        Responde únicamente con JSON:
                        {"posicion": numero}`

    const promptSystem2 = `Eres el jugador X en un juego de Totito.
                            El tablero contiene 9 posiciones numeradas del 0 al 8.
                            Debes elegir únicamente una posición undefined.
                            Si la posicion no es undefined busca otra posicion.

                            Prioridades:
                        1. Ganar si existe una jugada ganadora.
                        2. Bloquear al jugador si puede ganar.
                        3. Elegir una esquina.
                        4. Elegir cualquier posición disponible.
                        Responde únicamente con JSON:
                        {"posicion": numero}`
                        
    const TirarAI = async (tablero, turno) => {
        try {
            const response = await client.responses.create({
                model: 'gpt-5-nano',
                input: [
                    {
                        role: 'system',
                        content: turno == "O" ? promptSystem : promptSystem2
                    },
                    {
                        role: 'user',
                        content: JSON.stringify({
                            tablero,
                            jugadorAI: turno == "O" ? 'O' : "X"
                        })
                    }
                ],
            })

            const resultado = JSON.parse(response.output_text);
            return resultado.posicion
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TotitoContext.Provider value={{
            state,
            dispatch,
            MarcarHumano,
            RevisarGanador,
            TirarAI,
            //TiroAIx,
        }}>
            {children}
        </TotitoContext.Provider>
    );
}

export { TotitoContext, TotitoProvider }

