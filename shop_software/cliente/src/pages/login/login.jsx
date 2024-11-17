import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../../context/shop-context"; // Importa el contexto
import "./login.css";

const URI = "http://localhost:3001/users/";

const Login = () => {
  const context = useContext(ShopContext); // Accede al contexto
  const navigate = useNavigate();

  const [entrada, SetEntrada] = useState("");
  const [entradaP, SetEntradaP] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(URI);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const compare = () => {
    if (entrada === "" || entradaP === "") {
      alert("Por favor, ingresa tu usuario y contraseña.");
      return false;
    }

    const user = users.find(
      (e) => e.user_name === entrada && e.password === entradaP
    );
    if (!user) {
      alert("Usuario o contraseña incorrectos.");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="login-page">
        <div className="login-container">
          <img src="/logo-cocoa1.jpg" alt="Profile" />

          <h2>INICIAR SESION</h2>
          <form>
            <input
              value={entrada}
              onChange={(e) => SetEntrada(e.target.value)}
              type="text"
              name="user"
              id="user"
              placeholder="Usuario"
            />
            <input
              value={entradaP}
              onChange={(e) => SetEntradaP(e.target.value)}
              type="password"
              name="pass"
              id="pass"
              placeholder="Contraseña"
            />
            <input
              type="submit"
              className="btn-login"
              value="Login"
              onClick={(e) => {
                e.preventDefault(); // Evita la acción predeterminada del formulario
                if (compare()) {
                  if (entrada === "Admin") {
                    // Cambiar a admin y redirigir al inventario
                    context.AdminChanger(true);
                    navigate("/editInventory");
                  } else {
                    // Usuario regular, redirigir al carrito
                    navigate("/shop");
                  }
                  // Actualizar el estado de login en el contexto
                  context.loggedChanger(true);
                  context.setUserNameContext(entrada); // Guardar el nombre de usuario
                }
              }}
            />
          </form>
          {/* <div
            href="register"
            className="btn-register"
            onClick={() => navigate("/register")}
          >
            ¿No tienes cuenta? REGISTRATE
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
