import mongoose from "mongoose";


//esquema de los posts almacenados en la DB
const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
});

//modelos de "Post" a partir del esquema definido
const post = mongoose.model("Post", postSchema);

//export del modelo
export default post;