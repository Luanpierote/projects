/* var username = ['andre'];
var password = ['1234'];  */

const users = [
    {
        login: "andre", senha: "1234"
    },
    {
        login: "ciro", senha: "1234"
    },
    {
        login: "gomes", senha: "1234"
    }
]


document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault(); // bloqueia eventos padrões das tags

    var login = document.getElementById("login").value.trim();
    var senha = document.getElementById("senha").value;

        const userFound = users.find(u=>u.login === login && u.senha === senha); // método de iteração dos arrays
        //obs: for(let i in users) também funciona,mas com bugs

    if (userFound) {
        alert("sucesso");
        location.href = "home.html"; //redireciona
    } else {
        /* const mensgErr = document.getElementById('mensagem-erro') FUTURA MENSAGEM DE ERRO */
alert("Usuário ou senha incorretos");
        /*  mensgErr.style.display = 'block';   FUTURA MENSAGEM DE ERRO  */
   }

 }) 


