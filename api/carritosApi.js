const fs = require('fs');

const API = require('./api.js');       //Importamos la clase API
const api = new API();

const contenidoArchivo = fs.readFileSync('./data/dataCarritos.json', 'utf-8');      //Leemos el archivo de datos de carritos, se recibe en formato string
const carritos = JSON.parse(contenidoArchivo);                                     //Convertimos el string en JSON

//Clase CarritosAPI para el manejo de objetos producto

class CarritosAPI {
    constructor() {
        this.carritos = carritos;                                           //El constructor recibe como paramatro el arreglo de carritos leido del archivo
    }

    //Añade un nuevo carrito vacío al archivo de carritos
    addNew(){
        
        const hoy = new Date();                                             //Nueva instancia de la clase Date, se usa para el timeStamp

        const nuevoCarrito= {
            id: this.carritos.length + 1,
            timeStamp: hoy.toLocaleString(),
            productos: []
        };
        this.carritos.push(nuevoCarrito);
        fs.writeFileSync('./data/dataCarritos.json', JSON.stringify(this.carritos));

        return (nuevoCarrito.id);

    }

    //Elimina un carrito del archivo de carritos según su id
    deleteById(idAEliminar){

        const indexCarritos = this.carritos.findIndex((cart) => cart.id === +(idAEliminar));
        if(indexCarritos < 0){
            return ({error: `El Id ${idAEliminar} no se encuentra`});
        }

        this.carritos.splice(indexCarritos, 1);
        fs.writeFileSync('./data/dataCarritos.json', JSON.stringify(this.carritos));       //Escribe los cambios en el archivo data.json

        console.log (`Id de carrito eliminado ${idAEliminar}`);
        return this.carritos;
    }

    //Lista los productos guardados en determinado carrito, según su id
    getCartproductsByCartId(idABuscar){
        const carritoEncontrado = this.carritos.find((cart) => cart.id === +(idABuscar));   //Busca si el id recibido existe en el arreglo
        if (carritoEncontrado){
            return carritoEncontrado.productos;                                             //Regresa la propiedad productos del carrito encontrado
        }
        else {
        return ({error: 'Carrito no encontrado'});                                          //Si el Id no se encuentra, regresa este mensaje
        }
    }

    //Incorpora productos a un determinado según el id del carro y el id del producto
    addProductToCartByProductId(idCarro, body){

        const carritoEncontrado = this.carritos.find((cart) => cart.id === +(idCarro));     //Busca si el id recibido existe en el arreglo
        if (carritoEncontrado){
            const obtieneProducto = api.getById(body.id_prod);                              //Ahora obtiene la información del producto por su id
            
            const nuevoArreglo = carritoEncontrado.productos;                               //nuevoArreglo contendra los cambios en el carrito
            
            nuevoArreglo.push(obtieneProducto);                                             //Se añade el nuevo producto al arreglo nuevoArreglo
            carritoEncontrado.productos = nuevoArreglo;                                     //Igualamos el arreglo en el carrito al nuevoArreglo
            
            fs.writeFileSync('./data/dataCarritos.json', JSON.stringify(this.carritos));    //Escribe los cambios en el archivo data.json
        }
        else {
            return ({error: 'Carrito no encontrado'});                                      //Si el Id no se encuentra, regresa este mensaje
        }
    }

    deleteProductFromCartByProductId(idCarro, idProd){

        const carritoEncontrado = this.carritos.find((cart) => cart.id === +(idCarro));   //Busca si el id recibido existe en el arreglo
        if (carritoEncontrado){
           
            const indexDelProductoAEliminar = carritoEncontrado.productos.findIndex((product) => product.id === +(idProd));
            if(indexDelProductoAEliminar < 0){
                return ({error: `El Id de producto ${idProd} no se encuentra actualemnte en el carrito`});
            } 
            else{
                    carritoEncontrado.productos.splice(indexDelProductoAEliminar, 1);               //Quita el producto del carrito
                    fs.writeFileSync('./data/dataCarritos.json', JSON.stringify(this.carritos));    //Escribe los cambios en el archivo data.json
                }
        }
        else {
        return ({error: 'Carrito no encontrado'});                                          //Si el Id no se encuentra, regresa este mensaje
        }


    }

}

module.exports = CarritosAPI;