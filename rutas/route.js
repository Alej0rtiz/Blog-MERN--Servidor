// Importación del módulo Router de Express para crear rutas organizadas
import express from 'express';

// Importación de las funciones del controlador de usuarios
// - signupUser: lógica para registrar un nuevo usuario
// - loginUser: lógica para autenticar al usuario existente
import {signupUser, loginUser} from '../controlador/user-controller.js';


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


// Exportación del router para que pueda ser utilizado en el index.js
export default router;