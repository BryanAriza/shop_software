import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item'; 
import "./cart.css"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/products/';

export const Cart = () => {
    const context = useContext(ShopContext);
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); 
    const totalAmount = getTotalCartAmount(); 
    const navigate = useNavigate();

    const[products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();
        await axios.put(URI + 'buy', {
            "1": cartItems[1],
            "2": cartItems[2],
            "3": cartItems[3],
            "4": cartItems[4],
            "5": cartItems[5],
            "6": cartItems[6],
            "7": cartItems[7],
            "8": cartItems[8],
            "9": cartItems[9],
            "10": cartItems[10],
        })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            alert(err.message)
        });
        context.setPayAumount(totalAmount); 
        navigate('/stripe');
    }

    return (
        <div className="cart">
            <div> 
                <h1> Tu carrito de compras</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem key={product.id} data={product} />;
                    }
                    return null;
                })}
            </div>
            {totalAmount > 0 ? 
            <div className="checkout">
                <p className='total-check'> <b>Total Compra: {totalAmount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</b></p>
                <button onClick={() => navigate ("/shop")}> Continua Comprando</button>
                <button className="check" onClick={buy}> Finalzar compra </button>
            </div>
            : <h1> Tu carrito se encuentra vacio </h1>}
        </div>
    )
};