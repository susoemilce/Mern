import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

// import { v4 as uuidv4 } from 'uuid';

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  // const proyectos = [
  //   { id: 1, nombre: "Tienda virtual" },
  //   { id: 2, nombre: "Intranet" },
  //   { id: 3, nombre: "Diseño de sitio Web" },
  //   { id: 4, nombre: "MERN" },
  // ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  // Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type:PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  // Agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado);
      // Insertar el proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  //Valida el formulario por error
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  //Selecciona el proyecto en que el usuario dio click
  //No puse proyectoId porque no lo podia leer
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
export default ProyectoState;
