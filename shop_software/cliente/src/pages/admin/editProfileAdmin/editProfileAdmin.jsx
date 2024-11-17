import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './editAdmin.css';  // Asegúrate de tener este archivo para los estilos

const URIADMIN = 'http://localhost:3001/users/1/'; // URI para obtener los datos del administrador

const EditAdmin = () => {
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Cargar los datos del administrador cuando el componente se monta
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(URIADMIN);
                const adminData = response.data;

                setPassword(adminData.password || '');  // Si no existe, deja el valor vacío
                setAdress(adminData.adress || '');
                setTelephone(adminData.telephone || '');
                setEmail(adminData.email || '');
            } catch (error) {
                console.error('Error al cargar los datos del admin:', error);
            }
        };

        fetchAdminData();
    }, []);

    // Función para actualizar los datos del admin
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(URIADMIN, { password, adress, telephone, email });
            navigate('/editAdmin');
            alert('Información actualizada correctamente.');  // Redirigir a la página de inventario después de la actualización
        } catch (error) {
            console.error('Error al actualizar los datos del admin:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>EDITAR INFORMACIÓN</h2>
            <form onSubmit={update} className="form">
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="adress">Dirección</label>
                    <input 
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        type="text"
                        name="adress"
                        id="adress"
                        placeholder="Ingresa dirección"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telephone">Teléfono</label>
                    <input 
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        type="text"
                        name="telephone"
                        id="telephone"
                        placeholder="Ingresa un numero telefonico"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electronico</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ingresa tu correo electronico"
                    />
                </div>

                <button type="submit" className="btn-submit">EDITAR</button>
            </form>
        </div>
    );
};

export default EditAdmin;
