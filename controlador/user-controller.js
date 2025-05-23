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
            const TokenAccess = jwt.sign(userData.toJSON(), process.env.JWT_SECRET, { expiresIn: "25m" });
            // Generación del refresh token (expira en 7 días)
            const RefreshToken = jwt.sign(userData.toJSON(), process.env.REFRESH_SECRET, { expiresIn: "7d" });

            // Almacenamiento del refresh token en la base de datos (colección de tokens)
            const cleanedToken = RefreshToken.trim().replace(/^"|"$/g, '');
            const newToken = new Token({ token: cleanedToken});
            await newToken.save();
            console.log('RefreshToken generado y limpiado:', cleanedToken);

            // Respuesta al cliente con los tokens y datos del usuario
            return response.status(200).json({ TokenAccess: TokenAccess, RefreshToken: cleanedToken, name: userData.name, username: userData.username});

        }else{
        // Si la contraseña no coincide, error de autenticación
        return response.status(400).json({ message: 'Contraseña incorrecta' });
        }

    } catch (error) {
        // Captura de errores inesperados durante el login
        return response.status(500).json({ message: "Error en el inicio de sesion de usuario" })
    }
}

export const refreshToken = async (request, response) => {

    console.log('Body recibido:', request.body);
    const refToken = request.body.refreshToken;

    console.log('Token recibido en el body:', refToken);

    if(!refToken){
        return response.status(401).json({message: "Token de refresco no proporcionado"});
    }

    const TokenInDB = await Token.findOne({ token: refToken });

    console.log('Token encontrado en DB:', TokenInDB);

    if(!TokenInDB){
        return response.status(403).json({message: "Token de refresco invalido"});
    }

    try {
        const user = jwt.verify(refToken, process.env.REFRESH_SECRET);
        console.log("Token verificado correctamente:", user);//depuración

        const { exp, iat, ...cleanUser } = user; // Elimina propiedades conflictivas

        const newAccessToken = jwt.sign(cleanUser, process.env.JWT_SECRET, { expiresIn:"25m" });

        return response.status(200).json({ TokenAccess: newAccessToken });
    } catch (error) {
        console.error("Error al verificar token de refresco:", error);
        return response.status(403).json({ message: 'Refresh token expirado o inválido' });
    }
}

export const logoutUser = async (request, response) => {

    const refreshToken = request.body.refreshToken;

    if(!refreshToken){
        return response.status(400).json({ message: "Token de refresco no proporcionado" });
    }

    try {
        await Token.deleteOne({ token: refreshToken });

        return response.status(200).json({ message: "Sesión cerrada con exito" });
    } catch (error) {
        return response.status(500).json({ message: "Error al cerrar sesión" });
    }
}

export const getUserProfile = async (request, response) => {
    
    try {
        const user = await User.findById(request.user._id).select('-password');
        console.log("usuario:",user);
        if (!user) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }

}