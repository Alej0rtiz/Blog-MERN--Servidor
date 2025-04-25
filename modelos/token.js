//import de mongoose para interactuar con la DB de Mongo
import mongoose from "mongoose";

// esquema de los tokens almacenados en la DB
const TokenSchema = mongoose.Schema({ 

        token:{
            type: String,
            required: true,
        }
    })

//modelo de "User" a partir del esquema definido, permitirá interactuar con la colección de tokens en Mongo
const Token = mongoose.model('token', TokenSchema);

//export del modelo
export default Token;