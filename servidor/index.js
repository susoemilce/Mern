  
const express = require('express');
const URI = require('./config/db');
const cors = require('cors');
// crear el servidor
const app = express();

//Habilitar express.json
app.use(express.json({extended:true}));

// puerto de la app
const PORT =  4000
//Habilitar cors
app.use(cors());

//importar las rutas
app.use('/api/usuarios', require('./route/usuarios'));
app.use('/api/auth', require('./route/auth'));
app.use('/api/proyectos', require('./route/proyectos'));
app.use('/api/tareas', require('./route/tareas'));


/* //Definir l pagina principal
 app.get('/',(req, res) =>{
/     res.send('Hola Mundo')
   });*/

 //Arrancar la app
 app.listen(PORT, () => {
     console.log(`El servidor esta funcionando en el puerto ${PORT}`);
 })