//FUNÇÃO EM DESENVOLVIMENTO
import express from 'express';

const router = express.Router();

//Missão: Client Side = confirmar conta + Consumir essa API que irá iniciar uma nova sessão de usuário a partir de um Token gerado
router.post("/login", (req, res) => {
    const { userFound } = req.body;

    if (userFound) {
        //Recebe as credenciais válidas do login pelo req.body, e só retorna uma resposta positiva (200) caso o token seja gerado com JWT.
        res.json({ message: "Acesso autorizado!" });
    } else {
        //Pode estar incorreto!!
        res(403).json('não foi possível efetuar o Login! tente novamente')
    }
    //receber login e senha corretos e retornar um novo token com o tempo de expiração 
});

try {
    // tentativa de criar o token
    res.sendFile(path.join(__dirname, '../../public/login.html'));

} catch {
    //Erro interno no servidor
    //A credencial foi expirada? = restringir o acesso do usuário
}

export default router;