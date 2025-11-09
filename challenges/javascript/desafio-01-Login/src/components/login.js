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
/* const SECRET = new TextEncoder().encode(users); */

//Emissão de um evento ao enviar o formulário
document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault(); // bloqueia eventos padrões das tags

    var nome = document.getElementById("login").value.trim();
    var senha = document.getElementById("senha").value;

    const userFound = users.find(u => u.nome === nome && u.senha === senha); // método de iteração dos arrays
    //obs: for(let i in users) também funciona,mas com bugs
    try {
        if (userFound) {
            alert("sucesso");

            //Fetch API para enviar as credenciais do usuário via endpoint,retornando uma resposta contendo um Token JWT e o tempo de expiração em  HMAIC 
            const response = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userFound }),
            });

            const data = await response.json();

            // recebe a resposta positiva, e envia o usuário para a página correta 'window.location.href = '../public/home.html'
            if (response.ok) {
                //MÉTODO COM FRONT END
                //armazenar o token no local storage
                /* localStorage.setItem('token', token); */
                window.location.href = '/home.html'
                console.log(data.token);
                //Funciona!
                localStorage.setItem('token',data.token) //criou o Token e definiu
                /*MÉTODO COM ROUTER 
                 res.redirect("http://localhost:3000/public/home.html") */
            } else {
                alert("acesso inválido")
            }
        } else {
            const mensageErr = document.getElementById("erro");

            mensageErr.innerHTML = "Usuário ou senha incorretos! Tente Novamente";
            mensageErr.style.display = "block";
            /* const mensgErr = document.getElementById('mensagem-erro') FUTURA MENSAGEM DE ERRO */
            /*  mensgErr.style.display = 'block';   FUTURA MENSAGEM DE ERRO  */
            return { success: false, message: "Usuário ou senha incorretos! Tente Novamente" }
        }
    }
    catch (err) {
        //emite um erro de servidor ou de comunicação mal sucedida
        //tratamento do erro 401(não autorizado), o usuário não pode acessar , diretamente, a próxima página html se ele não for autorizado pelo servidor que gerou o Token
        console.log(err);
    }
});

/*Pendencias:

1.criar uma função assincrona para gerar uma assinatura digital com os usuários cadastrados✅
2.Acionar um tempo fixo assincrono de expiração, com duração de 5min pelo menos. E devolver o usuário para a página de Login após o tempo terminar.✅
3.criar uma função para Validar as credenciais dos usuários e efetuar uma sessão, de curta duração, com o Login( Redirecionando-os para outra página )✅
*/




