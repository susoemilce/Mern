import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  //Effect que detecta una tarea seleccionda
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  //Extraer el nombre del proyecto
  const { nombre } = tarea;
  //Si no hay proyecto seleccionado
  if (!proyecto) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    //Elegir si es edicion o si es una tarea nueva
    if (tareaseleccionada === null) {
      //Agregar nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      // tarea.estado = false;
      agregarTarea(tarea);
    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);
      //Elimina tarea seleccionada del state
      limpiarTarea();
    }

    //Obtener y filtrar las tareas
    obtenerTareas(proyectoActual.id);
    //Reinicial el proyecto
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            value={nombre}
            name="nombre"
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
