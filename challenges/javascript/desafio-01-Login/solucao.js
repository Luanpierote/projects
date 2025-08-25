/* var username = ['andre'];
var password = ['1234'];  */

const users = [
    { login: "andre" , senha: "1234"
    }
]

function loginUser(){

    var login = document.getElementById("login").value.trim();
    var senha = document.getElementById("senha").value;

    if(login == username && senha == password){
        alert("sucesso");
        location.href = "home.html"; //redireciona
    }else{
        alert("Usuário ou senha incorretos");
       /*  mensgErr.style.display = 'block';   FUTURA MENSAGEM DE ERRO  */
    }
}