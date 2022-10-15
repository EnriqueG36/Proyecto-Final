//Contiene las rutas de nuestros carritos de compras

const express = require('express');
const router = express.Router();
//const API = require('../../api/api.js');       //Importamos la clase API
//const api = new API();
const CarritosAPI = require('../../api/carritosApi.js');    //Importamos la clase CarritosAPI
const carritosApi = new CarritosAPI();

//Rutas

//POST crea un carrito y devuelve su id
router.post('/', (req,res) => {
    console.log("Llamada a Carritos post/");
     res.status(201).json(carritosApi.addNew());
 });

//DELETE/id Vacía un carrito y lo elimina
router.delete('/:id', (req, res) => {

    console.log("Llamada a Carrito delete/id")
    console.log(req.params);
    const {id} = req.params;

    res.status(201).json(carritosApi.deleteById(id))

});

//GET/id/productos lista todos los productos guardados en el carrito
router.get('/:id', (req, res) => {
    
    console.log("Llamada a Carrito get/:id")
    console.log (req.params);
    const {id} = req.params;

    res.status(201).json(carritosApi.getCartproductsByCartId(id));
      
});

//POST/id/productos Para incorporar productos al carrito por el id de producto
router.post('/:id/productos', (req,res) => {
    console.log("Llamada a Carritos post/id:/productos");
    console.log(req.params);
    console.log(req.body);
    const {id} = req.params;
    
     res.status(201).json(carritosApi.addProductToCartByProductId(id, req.body));   //En este body debe consistir en el id del producto
 });

//DELETE/:id/productos/:id_prod Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod', (req, res) => {

    console.log("Llamada a delete/:id/productos/:id_prod")
    console.log(req.params);
    const {id} = req.params;
    const {id_prod} = req.params;

    res.status(201).json(carritosApi.deleteProductFromCartByProductId(id, id_prod));

});

router.use('*', (req, res) => {
    res.status(404).send(
        {
            error: -2,
            decripcion: `Ruta ${req.path} metodo ${req.method}, no implementada`   
        });
    });


module.exports = router;