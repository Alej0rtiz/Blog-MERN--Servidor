//import de mongoose
import mongoose from "mongoose";

//esquema de los comentarios
const commentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments:{
        type: String,
        required: true
    }
})

const Comment = mongoose.model('comment', commentSchema);

//export del comentario
export default Comment;