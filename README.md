
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

-------------------------------Orientacion del proyecto Blog-MERN--Servidor-------------------------------

Este proyecto es un backend completo para una aplicación de blog desarrollada con el stack MERN (MongoDB, 
Express, React, Node.js). Proporciona todas las funcionalidades necesarias para gestionar usuarios, 
autenticar accesos, crear, leer, actualizar y eliminar publicaciones (posts), subir imágenes mediante 
GridFS, y almacenar comentarios en la base de datos.

Diseñado para integrarse fácilmente con un frontend en React, ofreciendo una API REST segura,
escalable y modular.

-------------------------------Estructura del proyecto Blog-MERN--Servidor-------------------------------

/src  Blog-MERN--Cliente
	

/Controlador: Lógica del programa asociada a cada ruta.

	/comment-controller.js: Controlador para operaciones relacionadas con comentarios en publicaciones.
		 Funciones:
        		NuevoComentario: Crea y guarda un nuevo comentario en la base de datos.
           			 Elementos: 
                			- request.body (contenido del comentario)
                			- Mongoose.save()
                			- Respuesta con estado 200 si es exitoso.

        		MostrarComentarios: Recupera todos los comentarios asociados a un post.
            			Elementos:
                			- request.params.id (ID del post)
                			- Mongoose.find({ postId })
                			- Retorna un array de comentarios.

        		BorrarComentario: Elimina un comentario específico por su ID.
            			Elementos:
                			- request.params.id (ID del comentario)
               				- Mongoose.findById()
                			- Mongoose.deleteOne()
	/image-controller.js: Controlador para la gestión de imágenes usando MongoDB GridFS.
    		Funciones:
        		SubirImagen: Maneja la subida de archivos y genera una URL pública.
            			Elementos:
                			- request.file (archivo subido vía multer)
                			- GridFSBucket (inicializado en la conexión)
                			- URL generada: http://localhost:8000/file/[nombre del archivo]
                			- Retorna mensaje y URL si se sube exitosamente.

        		BajarImagen: Descarga una imagen desde GridFS usando su nombre.
            			Elementos:
                			- request.params.filename (nombre del archivo a recuperar)
                			- gfs.files.findOne({ filename }) para encontrar el archivo
                			- gridBucket.openDownloadStream() para iniciar el stream
                			- Pipe del stream a la respuesta HTTP para entregar la imagen

	/jwt_controller.js: Middleware de autenticación con JWT (JSON Web Token).
    		Función:
        		AuthenticateToken: Verifica que la solicitud tenga un token JWT válido antes de permitir el acceso.
            			Elementos:
                			- request.headers['authorization']: Contiene el token en formato "Bearer TOKEN".
                			- jwt.verify(token, process.env.JWT_SECRET): Verifica la validez del token usando la clave secreta.
                			- request.user: Almacena los datos del usuario autenticado en la solicitud para su uso posterior.
                			- Manejo de errores:
                    				- 401 si no se proporciona token.
                    				- 403 si el token es inválido o expirado.

	/post_controller.js: Módulo para gestión de publicaciones (Posts) dentro del blog.
   		Funciones:
       			 CrearPost: Crea una nueva publicación y la guarda en MongoDB.
            			Elementos:
                			- request.body: Datos del post a crear (título, descripción, categoría, imagen, etc.).
                			- Post.save(): Guarda el documento en la base de datos.
                			- Respuesta con mensaje de éxito o error.

        		MostrarTodosPosts: Retorna todos los posts o los filtra por categoría si se proporciona un parámetro de consulta (?					   category=...).
            			Elementos:
                			- request.query.category: Permite filtrar publicaciones por categoría.
                			- Post.find(): Búsqueda general o filtrada por categoría.
                			- Respuesta con la lista de posts.

        		MostrarPost: Retorna un único post a partir del ID proporcionado por parámetro.
            			Elementos:
                			- request.params.id: ID del post a buscar.
                			- Post.findById(): Recupera el post desde MongoDB.

        		ActualizarPost: Actualiza los datos de un post existente.
            			Elementos:
                			- request.params.id: ID del post a actualizar.
                			- request.body: Nuevos datos del post.
                			- Post.findByIdAndUpdate(): Realiza la actualización parcial.
                			- Verificación previa de existencia del post.

        		BorrarPost: Elimina una publicación por su ID.
            			Elementos:
                			- request.params.id: ID del post a eliminar.
                			- Post.deleteOne(): Borra el documento si existe.
                			- Manejo de error si el post no se encuentra.

	/user_controller.js: Módulo para autenticación y manejo de usuarios.
    		Funciones:
        		signupUser: Registro de nuevos usuarios.
            			Elementos:
                			- request.body: Contiene username, name y password.
                			- bcrypt.genSalt() y bcrypt.hash(): Se usa para encriptar la contraseña antes de guardar.
                			- User.save(): Se almacena en la base de datos MongoDB.
                			- Retorna mensaje de éxito o error según resultado.

        		loginUser: Inicio de sesión para usuarios registrados.
            			Elementos:
                			- request.body.username: Se busca el usuario por nombre de usuario.
                			- bcrypt.compare(): Compara la contraseña ingresada con la almacenada en Mongo.
                			- jwt.sign(): Genera:
                    			- TokenAccess: JWT válido por 15 minutos.
                    			- RefreshToken: JWT válido por 7 días.
                			- Token.save(): Guarda el refresh token en la colección "tokens".
               					 - Retorna:
                    					- TokenAccess
                    					- RefreshToken
                   					- name y username del usuario autenticado.

/Database: Módulo de conexión a MongoDB Atlas utilizando Mongoose.

  	/db:Módulo de conexión a MongoDB Atlas utilizando Mongoose.
		Función:
            		Elementos:
               			  	- user: Usuario de acceso a la base de datos (credencial de MongoDB Atlas).
                			- passkey: Contraseña correspondiente al usuario.
                			- URL: Cadena de conexión que incluye las credenciales interpoladas.
                			- mongoose.connect(): Se encarga de establecer la conexión.
                			- console.log(): Mensaje de éxito o error según el resultado de la conexión.

/Modelos: Módulo para los modelos.

	/comment.js  Modelo Mongoose para los comentarios del blog.
		Campos:
			- name: Nombre del usuario que comenta (String, requerido).
			- postId: ID del post al que pertenece el comentario (String, requerido).
			- date: Fecha del comentario (Date, requerido).
			- comments: Contenido del comentario (String, requerido).

	/Post.js:Modelo Mongoose para las publicaciones (posts) del blog.
		Campos:
			- title: Título del post (String, requerido).
			- description: Contenido del post (String, requerido).
			- picture: URL de la imagen asociada (String, opcional).
			- username: Autor del post (String, requerido).
			- categories: Categoría del post (String, opcional).
			- creationDate: Fecha de creación (Date, opcional).

	/Token.js: Modelo Mongoose para almacenar tokens de actualización (refresh tokens).
		Campos:
			- token: Cadena JWT usada para renovar la sesión (String, requerido).
	
	/user.js: Modelo Mongoose para los usuarios registrados.
			Campos:
			- name: Nombre del usuario (String, requerido).
			- username: Nombre de usuario único (String, requerido, único).
			- password: Contraseña hasheada (String, requerido).
## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

