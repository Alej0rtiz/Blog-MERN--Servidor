//import de express - framework de servidor web para node.js
import express from 'express';
//dotenv para carga de variables de entorno (.env) al objeto process.env
import dotenv from 'dotenv';
//import de cors - Middleware que permite solicitudes desde otros dominios (Cross-Origin Resource Sharing)
import cors from 'cors';
//import de body parser - Middleware para procesar datos del cuerpo (body) de las solicitudes HTTP
import bodyParser from 'body-parser';

//Import del enrutador principal (definición de endpoints)
import Router from './rutas/route.js';

// ========================
//   CONFIGURACIONES GENERALES
// ========================

//carga de variables de entorno
dotenv.config();

//import de la conexion a la DB
import Connection from './DataBase/db.js';

//inicializacion de aplicacion en express
const app = express();

//puerto de levantamiento del servidor
const PORT = process.env.PORT || 8000;

// Habilita CORS para permitir peticiones entre diferentes dominios
const allowedOrigins = [
    'https://devsim-blog.vercel.app', // Frontend en producción
    'http://localhost:3000'           // Para desarrollo local
];

app.use(cors({
    origin: function (origin, callback) {
    if   (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    }   else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
}));



// Configura el body-parser para manejar solicitudes en formato JSON y urlencoded
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas definidas en el router importado
app.use('/', Router);

//arranque del servidor y mensaje de correcto funcionamiento
app.listen(PORT, () => console.log(`Servidor ejecutandose de forma exitosa en PORT ${PORT}`))

//conexion a la base de datos
Connection();