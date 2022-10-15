//const { productos } = require('../data/data.json');

const fs = require('fs');
const contenidoArchivo = fs.readFileSync('./data/data.json', 'utf-8');              //Leemos el archivo de datos de productos, se recibe en formato string
const productos = JSON.parse(contenidoArchivo);                                     //Convertimos el string en JSON

//Clase API para el manejo de objetos producto

const hoy = new Date();                                             //Nuesva instancia de la clase Date, con alcance global

class API {
    constructor() {
        this.productos = productos;
    }

    //Metodo para obtener todo el arreglo
    getAll(){
        return this.productos;
    }

    //Busca un producto en el arreglo por el id proporcionado
    getById(idABuscar){
        
        const productoEncontrado = this.productos.find((product) => product.id === +(idABuscar));   //Busca si el id recibido existe en el arreglo
        if (productoEncontrado){
            return productoEncontrado;                      //Regresa el objeto encontrado
        }
        else {
            return ({error: 'Producto no encontrado'});     //Si el Id no se encuentra, regresa este mensaje
        }
       
    }

    addNew(body){

        //const hoy = new Date();                                                 //Nueva isntancia de la clase Date (BORRAR)
               
        const {nombre, descripcion, codigo, foto, precio, stock} = body;
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            return ({error: "Formato del cuerpo incorrecto"})
        }
        const nuevoProducto = {
            id: this.productos.length + 1,
            timeStamp: hoy.toLocaleString(),
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        };
        this.productos.push(nuevoProducto);
        fs.writeFileSync('./data/data.json', JSON.stringify(this.productos));

        return (nuevoProducto);

        }
    

    updateById(id, body){

        //const hoy = new Date();                                                 //Nueva isntancia de la clase Date (BORRAR)

        //Buscamos si el objeto a actualizar existe en el arreglo productos y obtenemos el indice
        const indexProductos = this.productos.findIndex((product) => product.id === +(id));
        if(indexProductos < 0){
            return ({error: `El Id ${id} no se encuentra, no se puede actualizar`});
        }

         //Tomamos el id del objeto encontrado
        const idActualizar = this.productos[indexProductos].id;        


        const {nombre, descripcion, codigo, foto, precio, stock} = body;
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            return ({error: "Formato del cuerpo incorrecto, no se puede actualizar"})
        }

        //Creamos un nuevo objeto a partir del body recibido, y del id del objeto producto encontrado
        const nuevoProducto = {
            id: idActualizar,
            timeStamp: hoy.toLocaleString(),
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        };

        //Reemplazamos el producto del arreglo con el nuevo objeto
        this.productos[indexProductos] = nuevoProducto;                             //Actualiza el producto deseado por su id
        fs.writeFileSync('./data/data.json', JSON.stringify(this.productos));       //Escribe los cambios en el archivo data.json

        console.log(nuevoProducto)                              //Muestra por consola el producto que se actualizó

        return this.productos;                                  //Regresa el arreglo completo de productos actualizado

    }

    deleteById(idAEliminar){

        const indexProductos = this.productos.findIndex((product) => product.id === +(idAEliminar));
        if(indexProductos < 0){
            return ({error: `El Id ${idAEliminar} no se encuentra`});
        }

        this.productos.splice(indexProductos, 1);
        fs.writeFileSync('./data/data.json', JSON.stringify(this.productos));       //Escribe los cambios en el archivo data.json

        console.log (`Id eliminado ${idAEliminar}`);
        return this.productos;

    }
    
}

module.exports = API;