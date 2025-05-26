## Backend del proyecto Blog MERN DevSim

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

Este proyecto corresponde al backend completo para la aplicación de blog "DevSim" desarrollada con el stack MERN (MongoDB, 
Express, React, Node.js). Proporciona todas las funcionalidades necesarias para gestionar usuarios, 
autenticar accesos, crear, leer, actualizar y eliminar publicaciones (posts), subir imágenes mediante 
GridFS, y almacenar comentarios en la base de datos.

Diseñado para integrarse fácilmente con el frontend en React, ofreciendo una API REST
segura, escalable y modular.

---

### Instalación y Ejecución del Proyecto - Localmente

1. Clonar el proyecto desde nuestro repositorio Estructura del proyecto Blog-MERN--Servidor en GitHub,
 usando cualquier terminal que se prefiera, recomendamos [Warp](https://www.warp.dev/).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
https://github.com/Alej0rtiz/Blog-MERN--Servidor.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2. Una vez clonado, entramos a la carpeta del proyecto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd C:\Users\Usuario1\Documents\Blog-MERN--Servidor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3. En la carpeta del proyecto nos aseguramos de descargar todas las dependencias de nuestro
paquete en package.json (hay que contar con [Node y npm](https://nodejs.org/en)).

~~~~~~~~~~~
npm install
~~~~~~~~~~~

4. La estructura del archivo `.env` incluye las siguientes variables:

`MONGO_URI`: Enlace para conectar a la DB de mongo.

`PORT`: Puerto en el que funcionará el servidor del backend.

`BASE_URL`: Url con la que se crearán las URL de los archivos publicables.

`JWT_SECRET`: Clave y firma de los tokens de acceso ([JWT](https://jwt.io/introduction))

`REFRESH_SECRET`: Clave y firma de los tokens de refresco ([JWT](https://jwt.io/introduction))

5. Una vez finalizada la instalación y con las variables de entorno creadas, podemos ya iniciar el proyecto así:

~~~~~~~~~
npm start
~~~~~~~~~

6. Se abrirá el proyecto de forma local y automática; Verás que dice:

``` Powershell
Conectado a MongoDB Atlas
Servidor ejecutándose de forma exitosa en PORT [puerto definido en las variables de entorno]
```
---

### Estructura del Backend

/src  Blog-MERN--Servidor

/Controlador: Lógica del programa asociada a cada ruta.

/Database: Módulo de conexión a MongoDB Atlas utilizando Mongoose.

/Modelos: Módulo para los modelos.

---

### Dependencias del backend

Este proyecto utiliza Node.js como entorno de ejecución para el backend programada en JavaScript. Node se encarga 
de levantar el servidor, manejar solicitudes HTTP y gestionar las conexiones con MongoDB. Además, permite usar 
herramientas clave como npm para instalar dependencias necesarias como mongoose, bcrypt, jsonwebtoken y multer.

Por su parte, Express es el framework sobre el que está construido el servidor. Facilita la creación de rutas,
 middlewares y controladores que gestionan funcionalidades como crear publicaciones, registrar usuarios, 
subir imágenes y proteger rutas con autenticación JWT. Gracias a Express, el backend se organiza en 
módulos claros, escalables y fáciles de mantener.

---

#### Base de datos

`mongoose`: ODM (Object Data Modeling) que permite definir esquemas y modelos para interactuar con MongoDB.
		  Facilita operaciones CRUD (crear, leer, actualizar, eliminar).

`mongodb`: Librería de MongoDB, que usa aquí para integrar GridFS, que permite almacenar archivos binarios 
		(como imágenes) dentro de Mongo.

`gridfs-stream`: Permite trabajar con GridFS como si fuera un stream de Node.js, facilitando subir y 
		descargar archivos desde MongoDB. Se usa junto con mongodb y multer para gestionar archivos
		que sean subido por el usuario

#### Seguridad y Autenticación

`jsonwebtoken (jwt)`: Permite generar y verificar tokens JWT (AccessToken y RefreshToken). 
Se usa para autenticar usuarios de forma segura en las rutas protegidas.

#### Manejo de Archivos

`multer`: Middleware para manejar subidas de archivos en formato multipart/form-data. 
		Se usa para recibir imágenes desde el cliente y luego pasarlas al sistema de archivos
		(en este caso, MongoDB GridFS).

`gridfs-stream`: Permite trabajar con GridFS como si fuera un stream de Node.js, facilitando subir y 
		descargar archivos desde MongoDB. Se usa junto con mongodb y multer para gestionar archivos
		que sean subido por el usuario
