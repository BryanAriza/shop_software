import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../main.js";


//mostrar todos los registros
export const getAllProducts = async (req,res) => {
    try {
        const products  = await ProductModel.findAll()
        res.json(products)
    } catch (error) {
        res.json({message: error.message})
    }
}

//mostrar un registro
export const getProduct = async (req,res) => {
    try {
       const product = await ProductModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(product[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// crear un registro
export const createProduct = async (req,res) => {
    try {
        await ProductModel.create(req.body)
        res.json({
            'message': 'registro creado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

//actualizar registro
export const updateProducts = async (req,res) =>{
    try {
        await ProductModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro actualizado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar registro

export const deleteProduct = async (req,res) =>{
    try {
        await ProductModel.destroy(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro borrado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

//reservar o no reservar productos por medio de un click al carr

export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.f === 'unbook'){
            productsStock[req.params.id]++;
            return res.json('Unbooked');
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout')//en caso de que el producto sea igual a 0 se notifica que se acabo
            productsStock[req.params.id]--;
            return res.json('Booked');
        } 
        res.status(400).json('Bad request');
    } catch (error) {
        res.json({message: error.message});
    }
}

//Se actualiza el contenido de la base de datos
const updateContent = async (product, quantity) => {
    try {
        // Buscar el producto por ID
        const stock = await ProductModel.findOne({
            attributes: ['id', 'stock'],
            where: { id: product },
        });

        if (!stock) {
            throw new Error(`Producto con ID ${product} no encontrado.`);
        }

        // Obtener la cantidad del producto desde `quantity`, que es un objeto con las cantidades
        const cantidad = quantity[product]; // `quantity[product]` es la cantidad del producto a comprar

        // Actualizar el stock
        const nuevoStock = stock.dataValues.stock - cantidad;  // restamos la cantidad del stock
        if (nuevoStock < 0) {
            throw new Error(`El stock para el producto con ID ${product} no es suficiente.`);
        }

        // Actualizar el stock en la base de datos
        await ProductModel.update(
            { stock: nuevoStock },
            { where: { id: product } }
        );

        // Verificar si se alcanzó el stock mínimo y enviar correo
        if (productMinStock[product]?.stockMin >= nuevoStock) {
            sendMail({ id: product });
        }
    } catch (error) {
        console.error(`Error actualizando el producto con ID ${product}:`, error.message);
        throw error; // Permitir que el error sea manejado en `buyProducts`
    }
};


//Se compran los productos y se usa updatecontent para actualizar el contenido de cada uno
export const buyProducts = async (req, res) => {
    try {
        const productos = Object.keys(req.body);
        for (const product of productos) {
            const cantidad = req.body[product];
            if (cantidad > 0) {  // Solo procesar productos con cantidad mayor que 0
                await updateContent(product, req.body); // Pasamos todo el objeto `req.body` como segundo argumento
            }
        }
        res.json("Compra exitosa.");
    } catch (error) {
        console.error("Error procesando la compra:", error.message);
        res.status(500).json({ message: `Error procesando la compra: ${error.message}` });
    }
};
