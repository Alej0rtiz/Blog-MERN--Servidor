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

export const MostrarTodosPosts = async (request, response) => {
    
    let category = request.query.category;

    let posts;

    try {
        // Si hay categoría en la query, filtrar por esa categoría
        if (category){

            posts = await Post.find({categories: category});

        }else{

        posts = await Post.find({});

        }
        return response.status(200).json(posts);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }

}

export const MostrarPost = async (request, response) => {

    try {
        //busca por id el post correspondiente y lo retorna
        const post = await Post.findById(request.params.id);

        return response.status(200).json(post);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }

}