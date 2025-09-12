/* var username = ['andre'];
var password = ['1234'];  */

const users = [
    {
       id:1,  nome: "andre", senha: "1234"
    },
    {
        id:2, nome: "ciro", senha: "1234"
    },
    {
        id:3, nome: "gomes", senha: "1234"
    }
]




document.getElementById("loginForm").addEventListener("submit", function (e) {


    e.preventDefault(); // bloqueia eventos padrões das tags


    var nome = document.getElementById("login").value.trim();
    var senha = document.getElementById("senha").value;


    const userFound = users.find(u => u.nome === nome && u.senha === senha); // método de iteração dos arrays
    //obs: for(let i in users) também funciona,mas com bugs


    if (userFound) {
        alert("sucesso");
       


        const token = btoa(JSON.stringify({id:userFound.id,name:userFound.nome, exp:Date.now() + 60000})); //simulando a criação de um novo token, utilizando base64
        console.log("Login ok, token gerado",token);
       
       
   
        const decode = JSON.parse(atob(token)) //atob - decodifica base64


       


        return {success: true, token} && console.log(decode);
    } else {
        const mensageErr = document.getElementById("erro");


        mensageErr.innerHTML = "Usuário ou senha incorretos! Tente Novamente";
        mensageErr.style.display = "block";
        /* const mensgErr = document.getElementById('mensagem-erro') FUTURA MENSAGEM DE ERRO */
        /*  mensgErr.style.display = 'block';   FUTURA MENSAGEM DE ERRO  */
    return {success:false,message:"Usuário ou senha incorretos! Tente Novamente"}
    }


   
   
})



