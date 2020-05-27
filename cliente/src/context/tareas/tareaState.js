import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
// import { v4 as uuidv4 } from "uuid";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  // ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    // tareas: [
    //   { id: 1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
    //   { id: 2, nombre: "Elegir Color", estado: false, proyectoId: 2 },
    //   {
    //     id: 3,
    //     nombre: "Elegir Plataforma de Pago",
    //     estado: false,
    //     proyectoId: 3,
    //   },
    //   { id: 4, nombre: "Elegir Hosting", estado: true, proyectoId: 4 },
    //   { id: 5, nombre: "Elegir Plataforma", estado: true, proyectoId: 4 },
    //   { id: 6, nombre: "Elegir Color", estado: false, proyectoId: 2 },
    //   {
    //     id: 7,
    //     nombre: "Elegir Plataforma de Pago",
    //     estado: false,
    //     proyectoId: 3,
    //   },
    //   { id: 8, nombre: "Elegir Hosting", estado: true, proyectoId: 3 },
    //   { id: 9, nombre: "Elegir Plataforma", estado: true, proyectoId: 2 },
    //   { id: 10, nombre: "Elegir Color", estado: false, proyectoId: 2 },
    //   {
    //     id: 11,
    //     nombre: "Elegir Plataforma de Pago",
    //     estado: false,
    //     proyectoId: 3,
    //   },
    //   { id: 12, nombre: "Elegir Hosting", estado: true, proyectoId: 1 },
    // ],
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //Crear el dispatch y el state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear funciones

  //Obtener las tareas de un proyecto
  const obtenerTareas = async (proyecto) => {
    console.log(proyecto);
    try {
      const resultado = await clienteAxios.get("./api/tareas", {
        params: { proyecto },
      });
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    console.log(tarea);
    // tarea.id = uuidv4();
    try {
      const resultado = await clienteAxios.post("./api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida y muestra un error en caso que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  // Eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Cambia el estado de la tarea
  // const cambiarEstadoTarea = (tarea) => {
  //   dispatch({
  //     type: ESTADO_TAREA,
  //     payload: tarea,
  //   });
  // };
  //Edita o modifica una tarea
  const actualizarTarea = async (tarea) => {
    console.log(tarea);
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Extraer tarea para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Eliminar la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        // tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        // cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
