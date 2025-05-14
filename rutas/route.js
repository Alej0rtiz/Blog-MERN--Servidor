// Importación del módulo Router de Express para crear rutas organizadas
import express from 'express';

// Importación de las funciones del controlador de usuarios
// - signupUser: lógica para registrar un nuevo usuario
// - loginUser: lógica para autenticar al usuario existente
import {signupUser, loginUser} from '../controlador/user-controller.js';
// Importación de la función del controlador para la subida y bajada de imagenes
import { SubirImagen, BajarImagen } from '../controlador/image-controller.js';
// Importación de la función del controlador para crear un nuevo post
import { CrearPost, MostrarTodosPosts, MostrarPost, ActualizarPost, BorrarPost } from '../controlador/post-controller.js';

// Importación de la función de autenticación de tokens
import { AuthenticateToken } from '../controlador/jwt-controller.js';

import subida from '../utilidades/subida.js';

// ========================
//   DEFINICIÓN DEL ROUTER
// ========================

// Inicialización del router de Express
const router = express.Router();

// ===========================================
//               RUTAS DEL USUARIO
// ===========================================

/*
 * Ruta POST para registrar un nuevo usuario
 * Endpoint: /signup
 * Descripción:
 *  - Se activa cuando un cliente (por ejemplo, el frontend en React) hace una solicitud POST a "/signup".
 *  - Llama a la función signupUser del controlador, que se encarga de:
 *      → Validar y recibir los datos del formulario (username, name, password)
 *      → Hashear la contraseña con bcrypt
 *      → Guardar el nuevo usuario en la base de datos
 *      → Responder con un mensaje de éxito o error
 */
router.post('/signup', signupUser);


/*
 * Ruta POST para iniciar sesión
 * Endpoint: /login
 * Descripción:
 *  - Se activa cuando un cliente envía una solicitud POST a "/login".
 *  - Llama a la función loginUser del controlador, que realiza:
 *      → Búsqueda del usuario en la base de datos por su username
 *      → Comparación segura de contraseñas con bcrypt
 *      → (En versiones futuras) Generación de un token JWT y posiblemente un refresh token
 *      → Respuesta con el token y los datos del usuario si todo es correcto
 */
router.post('/login', loginUser);


/*
 * Ruta POST para subir archivos
 * Endpoint: /file/upload
 * Descripción:
 *  - Se activa cuando un cliente envía un archivo a través de un formulario.
 *  - Llama a la función SubirImagen del controlador, que se encarga de:
 *      → Guardar el archivo en la base de datos
 *      → Responder con la URL del archivo subido
 */
router.post('/file/upload', subida.single('file'), (req, res, next) => {//con middleware para recibir archivo del formulario
    console.log("Archivo recibido por multer:", req.file);
    next();
}, SubirImagen);


/*
 * Ruta GET para descargar archivos
 * Endpoint: /file/:filename
 * Descripción:
 *  - Se activa cuando un cliente solicita un archivo específico.
 *  - Llama a la función BajarImagen del controlador, que se encarga de:
 *      → Buscar el archivo en la base de datos
 *      → Responder con el archivo para su descarga
 */
router.get('/file/:filename', BajarImagen);

/**
 * Ruta POST: /create
 * Descripción:
 *  - Crea un nuevo post.
 *  - Requiere autenticación mediante JWT.
 *  - Llama al controlador CrearPost.
 * Flujo:
 *  → Verifica el token JWT con AuthenticateToken
 *  → Inserta los datos del post en la base de datos
 *  → Devuelve confirmación
 */
router.post('/create', AuthenticateToken, CrearPost);

/*
 * Ruta GET: /posts
 * Descripción:
 *  - Obtiene todos los posts.
 *  - Requiere autenticación mediante JWT.
 *  - Llama al controlador getAllPosts.
 * Flujo:
 *  → Verifica el token JWT con AuthenticateToken
 *  → Recupera los posts de la base de datos
 *  → Devuelve la lista de posts
 */
router.get('/posts', AuthenticateToken, MostrarTodosPosts);


/*
 * Ruta GET: /post
 * Descripción:
 *  - Obtiene un post específico.
 *  - Requiere autenticación mediante JWT.
 *  - Llama al controlador MostrarPost.
 * Flujo:
 *  → Verifica el token JWT con AuthenticateToken
 *  → Recupera el post de la base de datos
 *  → Devuelve el post solicitado
 */
router.get('/post/:id', AuthenticateToken, MostrarPost);


/*
 * Ruta PUT: /update/:id
 * Descripción:
 *  - Actualiza un post existente.
 *  - Requiere autenticación mediante JWT.
 *  - Llama al controlador ActualizarPost.
 * Flujo:
 *  → Verifica el token JWT con AuthenticateToken
 *  → Actualiza los datos del post en la base de datos
 *  → Devuelve confirmación de la actualización
 */
router.put('/update/:id', AuthenticateToken, ActualizarPost);


/*
 * Ruta DELETE: /delete/:id
 * Descripción:
 *  - Elimina un post específico.
 *  - Requiere autenticación mediante JWT.
 *  - Llama al controlador BorrarPost.
 * Flujo:
 *  → Verifica el token JWT con AuthenticateToken
 *  → Elimina el post de la base de datos
 *  → Devuelve confirmación de la eliminación
 */
router.delete('/delete/:id', AuthenticateToken, BorrarPost);


// Exportación del router para ser utilizado en el index.js
export default router;