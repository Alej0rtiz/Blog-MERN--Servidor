//import de mongoose - MongoDB desde node
import mongoose from "mongoose";


// Función asíncrona para establecer la conexión a MongoDB Atlas
// Recibe el usuario y la contraseña como parámetros
const Connection = async (user, passkey) => {

    // Se interpolan las variables 'user' y 'passkey' en la URL
    const URL = `mongodb+srv://${user}:${passkey}@blog-aplication.stbxi9o.mongodb.net/?retryWrites=true&w=majority&appName=Blog-aplication`    

    //conectar a la base de datos usando mongoose
    try {
        await mongoose.connect(URL);
        console.log('✅ Conectado a MongoDB Atlas');

    }catch (error){
        console.error('❌ Error al conectar a MongoDB Atlas:', error.message);
    }

}

//exportar la conexion para su uso en otros archivos
export default Connection;