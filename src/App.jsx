import { useEffect, useReducer } from "react"
import { InicioJuego } from "./components/InicioJuego"
//import { Reducer } from "./reduce/TotitoReduce"
import { Inicio } from "./Types/inicioType"
import { Juego } from "./components/Juego"
import { TotitoContext } from "./context"
import React from 'react';

function App() {

  const { dispatch, state } = React.useContext(TotitoContext)

  return (
    <>
      {!state.continuar && <InicioJuego />}
      {state.continuar && <Juego />}
    </>
  )
}

export default App
