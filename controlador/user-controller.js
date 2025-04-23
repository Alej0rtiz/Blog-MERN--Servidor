// Import del modelo de usuario para interactuar con la base de datos MongoDB
import User from "../modelos/user.js";
// Import de bcryptjs para el manejo seguro de contraseñas (hashing)
import bcrypt from "bcryptjs";

/*
 * Controlador para registrar un nuevo usuario
 * Se encarga de recibir los datos del formulario, crear un nuevo documento
 * y guardarlo en la base de datos.
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
        const userData = {username: request.body.username, nane: request.body.name, password: passwordHash};

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