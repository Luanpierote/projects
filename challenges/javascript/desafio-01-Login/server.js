import express from 'express';
import cors from "cors";
import path from 'path';    

import indexRoute from './src/components/index.js';  
import loginRoute from './src/controllers/loginController.js';

const app = express();

const port = 3000;

app.use(cors()); // futuramente liberando esta API para outras pessoas usarem
app.use(express.json()); 
app.use(express.static('public')); // Para servir conteúdo HTML,CSS deste diretório
app.use('/src',express.static('src')); //Para servir conteúdo JS deste diretório

app.use('/',indexRoute);
app.use('/api',loginRoute);

app.listen(port,()=>{console.log(`servidor rodando em: http://localhost:${port}`)})
