//Proyecto final 

const express = require('express');
const apiRoutes = require('./routers/routers.js');      //Importamos nuestro archivo principal de rutas

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Rutas
app.use('/api', apiRoutes);                             //Ruta a routers.js con prefijo /api


//Ejecución del metodo listen

//Log que nos indica que el servidor está corriendo
const connectedServer = app.listen(PORT, () => {
    console.log (`El servidor está listo y corriendo en el puerto ${PORT}`);        
})

//En caso de error, mostrar 
connectedServer.on('error',(error) => {
    console.log(error.message);
})



