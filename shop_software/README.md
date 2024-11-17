# Aplicación de Compra en Línea - Cocoamb

## Descripción

Esta aplicación está diseñada para facilitar la compra en línea de productos de **Cocoamb**, una microempresa de repostería artesanal. La aplicación está creada utilizando **ReactJS** y se divide en dos instancias: una para el **cliente (Front-end)** y otra para el **servidor (Back-end)**.

## Funcionalidades

1. **Visualización de productos sin necesidad de iniciar sesión:**
   - Los usuarios pueden explorar el catálogo de productos sin necesidad de estar logueados.

2. **Inicio de sesión para realizar compras:**
   - Si el usuario desea realizar una compra, se le pedirá iniciar sesión.
   - Es necesario estar registrado para proceder con la compra.

3. **Listado de productos disponibles para compra:**
   - Una vez logueado, el usuario podrá ver un listado de productos disponibles para su compra.

4. **Carrito de compras:**
   - Al seleccionar un producto, este se agregará al carrito de compras.
   - El carrito reflejará los productos seleccionados y permitirá finalizar la compra.

5. **Proceso de pago:**
   - Tras la finalización de la compra, el usuario será redirigido a una página de pago donde podrá realizar el pago mediante tarjeta de crédito.

## Tecnologías Utilizadas

- **Front-end:** ReactJS
- **Back-end:** Node.js (Servidor)
- **Base de datos:** shop

## Instalación

### Front-end (Cliente)
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/BryanAriza/shop_software.git

2. Instalar dependencias dentro del cliente y por fuera igual.
    ```bash
    shop_software/cliente> npm install
    shop_software> npm install

3. Iniciar servicio para el servidor y cliente
    ```bash
    shop_software/servidor> npm start

abre nueva terminal y activa el cliente
    ```bash
    shop_software/cliente> npm start
