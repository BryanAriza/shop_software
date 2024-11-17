import React from 'react';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/products/'; 

export const ShopAddtoCart = () => {

    const[products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <h3>PRODUCTOS DISPONIBLES PARA TI</h3>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    )
};