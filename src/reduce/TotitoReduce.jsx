import { Inicio, OpcionesValidas } from "../Types/inicioType";

const Reducer = (state, action) => {
    let nuevoArreglo;
    switch (action.type) {
        case Inicio.seleccionar:
            return {
                ...state,
                opcionInicio: action.payload.opcionInicio,
                continuar: true,
            };
            break;
        case Inicio.marcar:
            nuevoArreglo = [...state.tablero]
            nuevoArreglo[action.payload.index] = action.payload.symbol
            return {
                ...state,
                tablero: [...nuevoArreglo],
                turno: state.turno == "X" ? 'O' : 'X'
            }
        case Inicio.reiniciar:
            return {
                ...state,
                tablero: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                turno: 'X'
            }
        default:
            state
            break;
    }
}

export { Reducer };