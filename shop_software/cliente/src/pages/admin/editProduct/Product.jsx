import React, { useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:3001/products/';

export const Product = (props) => {
    const { id, nombre, precio, img1, img2, img3, stockMax, stockMin } = props.data;
    const { refreshProducts } = props; // Recibir la función refreshProducts

    const [priceHook, setPrice] = useState('');
    const [maxStock, setMaxS] = useState('');
    const [minStock, setMinS] = useState('');

    const update = async (e) => {
        e.preventDefault();
    
        // Si los campos están vacíos, tomar el valor actual del producto
        const updatedPrice = priceHook === '' ? precio : parseFloat(priceHook);
        const updatedMaxStock = maxStock === '' ? stockMax : parseInt(maxStock);
        const updatedMinStock = minStock === '' ? stockMin : parseInt(minStock);
    
        // Validación: asegurarse de que los valores sean números y no negativos
        if (
            !isNaN(updatedPrice) && updatedPrice >= 0 &&
            !isNaN(updatedMaxStock) && updatedMaxStock >= 0 &&
            !isNaN(updatedMinStock) && updatedMinStock >= 0
        ) {
            try {
                await axios.put(`${URI}${id}/`, {
                    precio: updatedPrice,
                    stockMax: updatedMaxStock,
                    stockMin: updatedMinStock
                });
    
                alert('Información actualizada correctamente.');
    
                // Limpiar campos después de actualizar
                setPrice('');
                setMaxS('');
                setMinS('');
    
                // Actualizar lista de productos
                refreshProducts();
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                alert('Ocurrió un error al intentar actualizar el producto.');
            }
        } else {
            alert("Por favor, ingrese valores válidos para el precio y el stock (no negativos).");
        }
    };

    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={img1} alt={nombre} /></li>
                    <li><img src={img2} alt={nombre} /></li>
                    <li><img src={img3} alt={nombre} /></li>
                </ul>
            </div>
            <div className="description">
                <p><b>{nombre}</b></p>
                <p>{precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <p>Max Stock: {stockMax}</p>
                <p>Min Stock: {stockMin}</p>
                <form onSubmit={update}>
                    <input
                        value={priceHook} // Enlazar el estado al campo
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        name="price"
                        placeholder="Nuevo precio"
                    />
                    <input
                        value={maxStock} // Enlazar el estado al campo
                        onChange={(e) => setMaxS(e.target.value)}
                        type="number"
                        name="maxStock"
                        placeholder="Nuevo Maximo Stock"
                    />
                    <input
                        value={minStock} // Enlazar el estado al campo
                        onChange={(e) => setMinS(e.target.value)}
                        type="number"
                        name="minStock"
                        placeholder="Nuevo Minima Stock"
                    />
                    <input
                        type="submit"
                        className="btn-login"
                        value="Edit"
                    />
                </form>
            </div>
        </div>
    );
};

