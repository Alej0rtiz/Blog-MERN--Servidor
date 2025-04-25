// Import del modelo de usuario para interactuar con la base de datos Mongo
import User from "../modelos/user.js";
// Import del modelo de tokens para interaccion con la base de datos Mongo
import Token from "../modelos/token.js";

// Import de bcryptjs para el manejo seguro de contraseñas (hashing)
import bcrypt from "bcryptjs";
// Inport de jsonwebtoken
import jwt from "jsonwebtoken";
// Import de dotenv para el uso de variables de entorno
import dotenv from "dotenv";

//inicializacion de dotenv
dotenv.config();


// ====================================================
//       CONTROLADOR PARA REGISTRAR UN NUEVO USUARIO
// ====================================================

/*
 * signupUser: Función asincrónica que registra un nuevo usuario.
 * 
 * Funcionalidad:
 *  - Recibe los datos del usuario desde el body de la solicitud (username, name, password).
 *  - Encripta la contraseña usando bcrypt.
 *  - Crea y guarda un nuevo documento en la colección "users" de MongoDB.
 *  - Retorna una respuesta exitosa si el proceso se completa correctamente.
 */
export const signupUser = async (request, response) =>{

    try{
        // Generación de un salt aleatorio con un coste de procesamiento de 10 rondas (bcrypt)
        const salt = await bcrypt.genSalt(10);
        // Se encripta la contraseña proporcionada en el cuerpo de la solicitud
        const passwordHash = await bcrypt.hash(request.body.password, salt);


        //logs de los datos para llevar vigilancia del correcto funcionamiento
        console.log("Datos recibidos:", request.body);

         // Se extraen los datos del cuerpo de la solicitud
        const userData = {username: request.body.username, name: request.body.name, password: passwordHash};

        // Se crea una nueva instancia del modelo User con los datos recibidos
        const newUser = new User(userData);
         // Se guarda el nuevo usuario en la base de datos
        await newUser.save();

        // Respuesta exitosa al cliente
        return response.status(200).json({ message: 'Usuario registrado exitosamente' });

    }catch(error){
        // En caso de error, se responde con un código 500 y un mensaje de error
        response.status(500).json({ message: 'Error en el registro'});
    }
}

// ====================================================
//           CONTROLADOR PARA INICIAR SESIÓN
// ====================================================

/*
 * loginUser: Función asincrónica que autentica a un usuario existente.
 * 
 * Funcionalidad:
 *  - Busca al usuario en la base de datos mediante su username.
 *  - Verifica la contraseña usando bcrypt.compare.
 *  - Si es válida, genera:
 *      → Access Token: válido por 15 minutos.
 *      → Refresh Token: válido por 7 días.
 *  - Guarda el refresh token en la base de datos.
 *  - Responde con los tokens y datos del usuario.
 */

export const loginUser = async (request, response) => {

    // Búsqueda del usuario por su username
    let userData = await User.findOne({ username: request.body.username });

    // Si no existe el usuario, retorna error
    if (!userData){
        return response.status(400).json({ message: 'El usuario no existe' });
    }

    try {
        // Comparación segura entre la contraseña proporcionada y la almacenada en la BD
        let correcta = await bcrypt.compare(request.body.password, userData.password);

        if(correcta){ 
            // Generación del access token (expira en 15 minutos)
            const TokenAccess = jwt.sign(userData.toJSON(), process.env.JWT_SECRET, { expiresIn: "15m" });
            // Generación del refresh token (expira en 7 días)
            const RefreshToken = jwt.sign(userData.toJSON(), process.env.REFRESH_SECRET, { expiresIn: "7d" });

            // Almacenamiento del refresh token en la base de datos (colección de tokens)
            const newToken = new Token({ token: RefreshToken })
            await newToken.save();

            // Respuesta al cliente con los tokens y datos del usuario
            return response.status(200).json({ TokenAccess: TokenAccess, RefreshToken: RefreshToken, name: userData.name, username: userData.username});

        }else{
        // Si la contraseña no coincide, error de autenticación
        return response.status(400).json({ message: 'Contraseña incorrecta' });
        }

    } catch (error) {
        // Captura de errores inesperados durante el login
        return response.status(500).json({ message: "Error en el inicio de sesion de usuario" })
    }
}