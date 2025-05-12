//import de jwt para la autenticación
import jwt from 'jsonwebtoken';
//import de dotenv para el manejo de variables de entorno
import dotenv from 'dotenv';

dotenv.config();

export const AuthenticateToken = (request, response, next) => {
     // Se admite tanto 'authorization' en minúsculas como 'Authorization'
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];

     // El token debe venir como "Bearer TOKEN", por lo que se separa
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // Si no hay token presente
    if (!token) {
        return response.status(401).json({ message: 'Token no proporcionado' });
    }
    // Verificación del token con la clave secreta del entorno
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {

        if (error) {
            return response.status(403).json({ message: 'Token no válido' });
        }

        //token valido:
        request.user = user; // Almacena la información del usuario en la solicitud
        next(); // Llama a la siguiente ruta
    });
}