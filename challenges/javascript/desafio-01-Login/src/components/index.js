import express  from 'express' ;
import path from 'path';
import { fileURLToPath } from 'url';

//funciona
const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename); // Módulo ESM não detecta __dirname naturalmente

const router = express.Router();

//funciona
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../../public/login.html'));
});

export default router; //Sintax ESM