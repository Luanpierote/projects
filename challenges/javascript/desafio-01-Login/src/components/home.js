/* const enviarNome = async () => {
    if (userFound.nome) {
        const resposta = await fetch("http://localhost:3000/api/home", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userFound.nome }),
        });
    }
} */

    //Assim que a página for carregada
const validarUsuário = async () => {
    //Procura Local Storage
    const token = localStorage.getItem('token');

    //Não tem token? retorne
    if (!token) window.location.href = '/login.html';

    //Tem Token
    try {
        //Manda o Token como autorização no Get Route
        const response = await fetch("http://localhost:3000/api/validacao", {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        
        //Se não for autorizado ou validado
        if (response.status === 403) {
            alert('Acesso Negado');
            window.location.href = '/login.html'; 
        } else {
            //Acesso autorizado
            console.log(`Acesso Autorizado!, ${response.nome}`)
        }
    } catch (err) {
        //Se der qualquer outro erro, retorna também
        alert('Houve algum erro, tente novamente');
        window.location.href = '/login.html';
        console.error({ err });
    }
}

validarUsuário();