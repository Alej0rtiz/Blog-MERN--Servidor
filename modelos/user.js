//import de mongoose para interactuar con la DB de Mongo
import mongoose from "mongoose";

// esquema de usuario con los campos que tendrá el documento en MongoDB
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

//modelo de "User" a partir del esquema definido, permitirá interactuar con la colección de usuarios en Mongo
const User = mongoose.model("user", userSchema);

//export del modelo
export default User;