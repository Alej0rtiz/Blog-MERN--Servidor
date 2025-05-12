//imports de multer y multer-gridfs-storage para la subida de archivos
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config(); //carga de variables de entorno

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;


//configuracion del almacenamiento con gridFS
const storage = new GridFsStorage({

    url: `mongodb+srv://${user}:${pass}@blog-aplication.stbxi9o.mongodb.net/?retryWrites=true&w=majority&appName=Blog-aplication`,
    options: { useNewUrlParser: true},// Evita warnings en la conexión
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        // Si el archivo no es del tipo permitido, se rechaza
        if (match.indexOf(file.mimetype) === -1) {
            return false;
            //return `${Date.now()}-file-${file.originalname}`;
        }
        // Si es válido, se define su nombre único y el bucket de destino
        return {
            bucketName: "images",
            filename: `${Date.now()}-file-${file.originalname}`
        };
    }

})
// Exportación de la configuración lista para usarse como middleware en las rutas
export default multer({ storage });

