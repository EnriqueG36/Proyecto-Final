//RUTA api/productos

//Contiene las rutas de nuestros productos

const express = require('express');
const router = express.Router();
const API = require('../../api/api.js');       //Importamos la clase API
const api = new API();



//Rutas

// Envía todo el arreglo de objetos
router.get('/', (req, res) => {
    
    console.log("llamada a get");
    res.status(201).json(api.getAll());
    
});

//Devuelve un objeto según su parametro id, mediante Path params

router.get('/:id', (req, res) => {
    
    console.log("Llamada a get/:id")
    console.log (req.params);
    const {id} = req.params;

    res.status(201).json(api.getById(id));

      
});

//Recibe y agrega un producto
router.post('/', (req,res) => {
   console.log("Llamada a post/");
   console.log (req.body);
    res.status(201).json(api.addNew(req.body));
});

//Actualiza un objeto producto según los params id y body
router.put('/:id', (req, res) => {
    console.log("Llamada a Put/id")
    console.log(req.params);
    console.log(req.body);

    const {id} = req.params;

    res.json(api.updateById(id, req.body));            //La funcion updateById recibe dos parametros, el Id y el Body


});

//Elimina un producto según su id
router.delete('/:id', (req, res) => {

    console.log("Llamada a delete/id")
    console.log(req.params);
    const {id} = req.params;

    res.status(201).json(api.deleteById(id))

});

router.use('*', (req, res) => {
    res.status(404).send(
        {
            error: -2,
            decripcion: `Ruta ${req.path} metodo ${req.method}, no implementada`   
        });
    })

//--------------------------------------------------------------------------------------------------------------
module.exports = router;                    //Exportamos nuestro Router