import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { MinusCircle, PlusCircle } from "phosphor-react";

export const CartItem = (props) => {
    const { id, nombre, precio, img1 } = props.data;
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    return  (
        <div className="cartItem">
            <img src={img1} alt="" />
            <div className="description">
                <p> 
                    <b> {nombre} </b>
                </p>
                <p> {precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} </p>
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}><MinusCircle size={20} /> </button>
                    <input value={cartItems[id]} readOnly />
                    <button onClick={() => addToCart(id)}>  <PlusCircle size={20} /></button>
                </div>
            </div>
        </div>
    );
};