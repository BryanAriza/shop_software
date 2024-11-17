import React from "react";

export const Product = (props) => {
    const { nombre, precio, descripcion, img1, img2, img3 } = props.data;

    return (
        <div className="product"> 
            <div className="slide-var">
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
            </div>
           
        </div> 
    );
};