import Post from "../modelos/post.js";

//función de la creacion de los posts
export const CrearPost = async (request, response) => {
    
    try{
        const post = await new Post(request.body);// Se crea una nueva instancia del modelo Post con los datos del cuerpo
        post.save(); // Guardado en la base de datos

        return response.status(200).json({message: "Post creado correctamente"});
    
    }catch(error){
        return response.status(500).json({message: error.message});
    }
}