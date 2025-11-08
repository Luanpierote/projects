/* var username = ['andre'];
var password = ['1234'];  */



//Definição das chaves e valores do array de objetos
const users = [
    {
        id: 1, nome: "andre", senha: "1234"
    },
    {
        id: 2, nome: "ciro", senha: "1234"
    },
    {
        id: 3, nome: "gomes", senha: "1234"
    }
]

//Transformar o Array em código binário para o HMAC ler - Alternativa para Autenticação de Sistema
const SECRET = new TextEncoder().encode(users);


//Emissão de um evento ao enviar o formulário
document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault(); // bloqueia eventos padrões das tags

    var nome = document.getElementById("login").value.trim();
    var senha = document.getElementById("senha").value;

    const userFound = users.find(u => u.nome === nome && u.senha === senha); // método de iteração dos arrays
    //obs: for(let i in users) também funciona,mas com bugs
    
    if (userFound) {
        alert("sucesso");

        const token = btoa(JSON.stringify({ id: userFound.id, name: userFound.nome, exp: Date.now() + 60000 })); //simulando a criação de um novo token, utilizando base64
        console.log("Login ok, token gerado", token);

        const decode = JSON.parse(atob(token)) //atob - decodifica base64

        return { success: true, token } && console.log(decode) && console.log(token);

    } else {
        const mensageErr = document.getElementById("erro");

        mensageErr.innerHTML = "Usuário ou senha incorretos! Tente Novamente";
        mensageErr.style.display = "block";
        /* const mensgErr = document.getElementById('mensagem-erro') FUTURA MENSAGEM DE ERRO */
        /*  mensgErr.style.display = 'block';   FUTURA MENSAGEM DE ERRO  */
        return { success: false, message: "Usuário ou senha incorretos! Tente Novamente" }
    }

})

/*Pendencias:

1.criar uma função assincrona para gerar uma assinatura digital com os usuários cadastrados
2.Acionar um tempo fixo assincrono de expiração, com duração de 5min pelo menos. E devolver o usuário para a página de Login após o tempo terminar.
3.criar uma função para Validar as credenciais dos usuários e efetuar uma sessão, de curta duração, com o Login( Redirecionando-os para outra página )


Oque eu fiz nesse código?
Uma simulação de token gerado a partir dos dados de usuários armazenados por um array de objetos, representado como uma sequencia de caracteres codificados em base64.
A solução então, percorre esse array, verifica a autenticação do usuário no login, decodifica o token gerado convertendo o texto para JSON, e retorna a operação 
como bem sucedida.

Oque eu compreendi realmente sobre isso?
módulos nativos JS para serialização de Strings, conversão de valores e objetos, tipos de criptografia e hashing de senhas. 

Oque falta? 
Incorporar estados dos objetos no meu projeto, para rastrear o mesmento que o token é expirado em tempo real e encerrar a sessão do sistema.

Como chegar nesse resultado? Quais são as alternativas?
Primeiramente criar um servidor de aplicação que execute o projeto em tempo real, depois delegar as funções client side do Back end, e então 
desenvolver APIs que se comunicam por rotas para estabelecer a conexão. Encriptar o email de usuário e senha utilizando JWT, e rastrear o tempo
de expiração do token invalidando o login do usuário após um tempo determinado.

que feedback eu posso tirar do que eu fiz?

Oque um programador faria para melhorar isso?


*/




