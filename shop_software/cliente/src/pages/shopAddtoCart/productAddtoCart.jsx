import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img1, img2, img3 } = props.data; 
    const { addToCart, cartItems} = useContext(ShopContext); 

    const cartItemAmount = cartItems[id];
    return (
        <div className="product">
            <div className="slide-var"> {/*se hace el carusel */}
                <ul>
                    <li><img src={img1} alt={nombre}/></li>
                    <li><img src={img2} alt={nombre}/></li>
                    <li><img src={img3} alt={nombre}/></li>
                </ul>
            </div>
            <div className="title-product"> 
                <p> 
                    <b>{nombre}</b> 
                </p>
            </div>
            <div className="description">
                <p>{descripcion}</p>
                <p><b> {precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} </b></p>
                <button className="addToCartBttn" onClick={() => addToCart(id)}> 
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
            </div>
            
        </div> 
    );
};