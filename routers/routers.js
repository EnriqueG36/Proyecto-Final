

const express = require('express');
const productsRoutes = require('./products/products.routes.js');        //Importamos las rutas para productos
const shopCartRoutes = require('./shop_carts/shop_carts.routes.js');    //importamos las rutas para carritos de compra

const router = express.Router();

//Prefijos de rutas

router.use('/productos', productsRoutes);                //Agregamos el prefijo /products a las rutas incluidas en productsRouters
router.use('/shop_carts', shopCartRoutes);              //Agregamos el prefijo /shop_carts a las rutas oncluidas en shopCartRoutes



module.exports = router;                                //Exportamos la instancia de nuestro router