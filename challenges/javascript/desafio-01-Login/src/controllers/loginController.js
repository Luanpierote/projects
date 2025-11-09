//FUNÇÃO PRONTA
//API FUNCIONANDO
//ENCRIPTAÇÃO FUNCIONANDO
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // para carregar as variáveis de ambiente

/* console.log(process.env.SECRET); */

const SECRET = process.env.SECRET;

const router = express.Router();

//Missão: Client Side = confirmar conta + Consumir essa API que irá iniciar uma nova sessão de usuário a partir de um Token gerado✅
router.post("/login", (req, res) => {
    const { userFound } = req.body;

    if (!userFound) { 
        //Recebe as credenciais válidas do login pelo req.body, e só retorna uma resposta positiva (200) caso o token seja gerado com JWT.
        return res.status(403).json({error: "E-mail ou senha inválidos!"}); // acesso não autorizado
    }

    //Tratando a resposta positiva ✅
    const token = jwt.sign({nome:userFound.nome}, SECRET,{
        expiresIn:"10s",
    }); 
    return res.status(200).json({token});
    
    //receber login e senha corretos e retornar um novo token com o tempo de expiração 
});

//API Validar Token Em andamento...
router.get("/validacao",(req,res) =>{
    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if(!token)return res.status(403).json({error: "não autorizado, não achei o token"});

    jwt.verify(token,SECRET,(err,nome)=>{
        if(err)return res.status(403).json({error: "não autorizado, na verificação"});

        res.json({message:"acesso autorizado",nome})

    });
});

/* try {
    // tentativa de criar o token
    res.sendFile(path.join(__dirname, '../../public/login.html'));
    return res.status(200).json({success: true, message: "Login Autorizado!"})
} catch {
    //Erro interno no servidor
    //A credencial foi expirada? = restringir o acesso do usuário
} */

    /* DENTRO DO HEADER
     {
        headers: {authorization: `Bearer ${token}`}
    } */

export default router;