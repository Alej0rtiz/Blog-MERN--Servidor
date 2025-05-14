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

// Obtiene todos los posts. Si se pasa una categoría como query param (?category=...), filtra por dicha categoría
export const MostrarTodosPosts = async (request, response) => {
    
    // Obtiene el valor del parámetro 'category' desde la URL
    let category = request.query.category;

    let posts;

    try {
        // Si hay categoría en la query, filtrar por esa categoría
        if (category){

            posts = await Post.find({categories: category});

        }else{
        //si no, retorna todos los posts
        posts = await Post.find({});

        }
        return response.status(200).json(posts);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }

}

// Retorna un post específico a partir del ID proporcionado en los parámetros de la URL
export const MostrarPost = async (request, response) => {

    try {
        //busca por id el post correspondiente y lo retorna
        const post = await Post.findById(request.params.id);

        return response.status(200).json(post);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }

}

// Actualiza un post existente utilizando su ID y los nuevos datos enviados en el cuerpo de la solicitud
export const ActualizarPost = async (request, response) => {

    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({message: "Post no encontrado"});// Si no se encuentra, retorna error 404
        }

         // Actualiza el post con los nuevos datos. Solo se modifican los campos enviados en el cuerpo.
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

        return response.status(200).json({message: "Post actualizado correctamente"});

    } catch (error) {
        return response.status(500).json({message: error.message});
    }

}

// Elimina un post específico a partir de su ID
export const BorrarPost = async (request, response) => {
    
    try {
        
        // Verifica si el post existe
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({message: "Post no encontrado"});// Si no existe, responde con 404
        }

        await post.deleteOne();// Elimina el documento directamente

        return response.status(200).json({message: "Post eliminado de forma exitosa"});

    } catch (error) {
        return response.status(500).json({message: error.message});
    }
}