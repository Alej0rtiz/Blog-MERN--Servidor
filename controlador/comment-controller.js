import Comment from "../modelos/comment.js"

//función para la creacion de un nuevo comentario
export const NuevoComentario = async (request, response) => {

    try {
        const comment = new Comment(request.body);
        await comment.save();

        response.status(200).json({ message: "Comentario agregado correctamente" });
    } catch (error) {
        response.status(500).json({ message: "Error al agregar comentario", error: error.message });
    }

}

//funcion para mostrar los comentarios de un post, usando su Id (del post)
export const MostrarComentarios = async (request, response) => {

    try {
        const comments = await Comment.find({ postId: request.params.id });
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener comentarios", error: error.message });
    }

}

//función de eliminacion de un post, basado en el id de este
export const BorrarComentario = async (request, response) => {

    try {
        const comentario = await Comment.findById(request.params.id);
        await comentario.deleteOne();
        response.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        response.status(500).json({ message: "Error al eliminar comentario", error: error.message });
    }
}  