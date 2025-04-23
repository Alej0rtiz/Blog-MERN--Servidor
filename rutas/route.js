// Importación del módulo Router de Express para crear rutas manejables
import express from 'express';

// Importación del controlador de usuario que contiene la lógica para registrarse
import {signupUser} from '../controlador/user-controller.js';


// ========================
//   DEFINICIÓN DEL ROUTER
// ========================

// Inicialización del router de Express
const router = express.Router();

// Ruta POST para registro de usuario
// Se activa cuando el cliente realiza una solicitud POST a "/signup"
// y delega el manejo de esa solicitud a la función signupUser del controlador
//[COMENTARIOS SUJETOS A CAMBIOS]
router.post('/signup', signupUser);


// Exportación del router para que pueda ser utilizado en el index.js
export default router;