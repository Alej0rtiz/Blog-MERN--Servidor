Readmebackend.txt

---------------------------------Instalación y Ejecución del Proyecto---------------------------------

1. Clonar el proyecto desde nuestro repositorio Estructura del proyecto Blog-MERN--Servidor en GitHub,
 usando cualquier terminal que se prefiera, en este caso usamos Warp.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
https://github.com/Alej0rtiz/Blog-MERN--Servidor.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2. Una vez clonado, entramos a la carpeta del proyecto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd C:\Users\Usuario1\Documents\Blog-MERN--Servidor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3. Una vez en la carpeta del proyecto nos aseguramos de descargar todas las dependencias de nuestro
paquete en package.json.

~~~~~~~~~~~
npm install
~~~~~~~~~~~

4. Una vez finalizada la instalación, podemos ya iniciar el proyecto así:

~~~~~~~~~
npm start
~~~~~~~~~

5. Se abrirá el proyecto de forma local y automática; Verás que dice Conectado a MongoDB Atlas
Servidor ejecutándose de forma exitosa en PORT 8000

--------------------------Orientación del backend del proyecto Blog MERN DevSim---------------------------

Este proyecto es un backend completo para una aplicación de blog desarrollada con el stack MERN (MongoDB, 
Express, React, Node.js). Proporciona todas las funcionalidades necesarias para gestionar usuarios, 
autenticar accesos, crear, leer, actualizar y eliminar publicaciones (posts), subir imágenes mediante 
GridFS, y almacenar comentarios en la base de datos.

Diseñado para integrarse fácilmente con un frontend en React, ofreciendo una API REST
segura, escalable y modular.

--------------------------------Estructura del proyecto Blog-MERN--Servidor-------------------------------

/src  Blog-MERN--Servidor

/Controlador: Lógica del programa asociada a cada ruta.

/Database: Módulo de conexión a MongoDB Atlas utilizando Mongoose.

/Modelos: Módulo para los modelos.

------------------------------Dependencias del backend del proyecto Blog MERN DevSim-----------------------------

Este proyecto utiliza Node.js como entorno de ejecución para el backend programada en JavaScript. Node se encarga 
de levantar el servidor, manejar solicitudes HTTP y gestionar las conexiones con MongoDB. Además, permite usar 
herramientas clave como npm para instalar dependencias necesarias como mongoose, bcrypt, jsonwebtoken y multer.

Por su parte, Express es el framework sobre el que está construido el servidor. Facilita la creación de rutas,
 middlewares y controladores que gestionan funcionalidades como crear publicaciones, registrar usuarios, 
subir imágenes y proteger rutas con autenticación JWT. Gracias a Express, el backend se organiza en 
módulos claros, escalables y fáciles de mantener.

Dependencias:

	/mongoose: ODM (Object Data Modeling) que permite definir esquemas y modelos para interactuar con MongoDB.
		  Facilita operaciones CRUD (crear, leer, actualizar, eliminar).

	/mongodb: Librería de MongoDB, que usa aquí para integrar GridFS, que permite almacenar archivos binarios 
		(como imágenes) dentro de Mongo.

	/gridfs-stream: Permite trabajar con GridFS como si fuera un stream de Node.js, facilitando subir y 
		descargar archivos desde MongoDB. Se usa junto con mongodb y multer para gestionar archivos
		que sean subido por el usuario

-------------------------------------------Seguridad y Autenticación--------------------------------------------

Dependencias: 

	/jsonwebtoken (jwt): Permite generar y verificar tokens JWT. Se usa para autenticar usuarios de forma
			 segura en las rutas protegidas.(AccessToken y RefreshToken).

-----------------------------------------------Manejo de Archivos-----------------------------------------------

Dependencias:

	/multer: Middleware para manejar subidas de archivos en formato multipart/form-data. 
		Se usa para recibir imágenes desde el cliente y luego pasarlas al sistema de archivos
		(en este caso, MongoDB GridFS).

	/gridfs-stream: Permite trabajar con GridFS como si fuera un stream de Node.js, facilitando subir y 
		descargar archivos desde MongoDB. Se usa junto con mongodb y multer para gestionar archivos
		que sean subido por el usuario


Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

