import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, SignOut, UserCircle, CaretDown } from "phosphor-react"; 
import "./navbar.css";
import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate(); // Hook para redirección

    // Estado para controlar la visibilidad de la lista desplegable
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Guardar el estado del dropdown en localStorage o sessionStorage
    useEffect(() => {
        // Si el usuario está logueado, cerramos el dropdown por defecto
        if (context.logged) {
            setDropdownVisible(false);
        }
    }, [context.logged]); // Dependencia: Cuando el estado 'logged' cambie, se actualizará el estado del dropdown

    const handleLogout = () => {
        context.logout(); // Llama al método logout del contexto
        setDropdownVisible(false); // Cierra el dropdown al hacer logout
        navigate("/login"); // Redirige al login
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible); // Alterna la visibilidad del dropdown
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src="/name-cocoa.png" alt="Profile" width="200" />
                {!context.Admin ? (
                    !context.logged ? (
                        <div className="links menu-items">
                            <Link to="/">Productos</Link>
                        </div>
                    ) : (
                        <div className="links menu-items">
                            <Link to="/shop">Compra Productos</Link>
                        </div>
                    )
                ) : (
                    <>
                        <div className="links menu-items">
                            <Link to="/editInventory">Productos</Link>
                        </div>
                        <div className="links menu-items">
                            <Link to="/shop">Compra Productos</Link>
                        </div>
                    </>
                )}
            </div>
            <div className="navbar-right">
                {context.logged ? (
                    <div className="user-info">
                        <Link to="/cart">
                            <ShoppingCart size={32} />
                        </Link>
                        
                        {/* Nombre del usuario con lista desplegable */}
                        <span onClick={toggleDropdown} className="user-name">
                            Hola, {context.userName} <CaretDown size={24} />
                        </span>

                        {/* Lista desplegable */}
                        {dropdownVisible && (
                            <div className="dropdown">
                                <Link to="/editAdmin" className="dropdown-item">
                                    <UserCircle size={24} />
                                    Admin Profile
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item logout-btn">
                                    <SignOut size={24} />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        <ShoppingCart size={32} />
                    </Link>
                )}
            </div>
        </div>
    );
};
