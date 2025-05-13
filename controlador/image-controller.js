import grid from 'gridfs-stream';
import mongoose from 'mongoose';

// URL base del servidor para construir las URLs de los archivos
const url = 'http://localhost:8000';

// Declaración de variables globales para GridFS y GridFSBucket
let gfs, gridBucket;

// Conexión activa a la base de datos de MongoDB
const conn = mongoose.connection;
conn.once('open', () => {
    // Inicialización del bucket GridFS para almacenamiento de imágenes
    gridBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
    });
    // Inicialización del stream de GridFS para manejo de archivos
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

// Maneja la subida de archivos a través de `multer` y `GridFS`.
// Genera una URL pública para acceder al archivo subido.
export const SubirImagen = (request, response) =>{

    if(!request.file) {
        return response.status(400).json({ message: 'Archivo no encontrado' });
    }

    const imagenUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json({ message: 'Archivo subido con éxito', url: imagenUrl });

};


//Recupera un archivo previamente subido mediante su `filename`.
// Usa `GridFSBucket` para abrir un stream de lectura y enviarlo como respuesta.
export const BajarImagen = async (request, response) => {

    try {
        // Búsqueda del archivo por su nombre
        console.log("Intentando descargar archivo con nombre:", request.params.filename);
        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {//validacion de que haya un archivo
            return response.status(404).json({ message: 'Archivo no encontrado' });
        }

        // Stream de descarga abierto por el ID del archivo
        const readStream = gridBucket.openDownloadStream(file._id);
        
        // Pipe del archivo directamente a la respuesta HTTP
        readStream.pipe(response);
        
    } catch (error) {
        
        console.error('Error al descargar la imagen:', error);
        return response.status(500).json({ message: 'Error al descargar la imagen' });

    }
};