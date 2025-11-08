//FUNÇÃO EM DESENVOLVIMENTO


async function redirectLogin(req,res){
    const {nome,senha} = req.body;

    const response = await fetch("http://localhost:3000/api/login",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome,senha}),
    });
    if(response.ok){
        const usuario = await response.json();
        //Se o JSON retornar o boolean{sucess: true}
        if(usuario.sucess){
            window.location.href = '../public/home.html'
        }else{
            alert('não foi possível efetuar o Login! tente novamente')
        }
    }
}

module.exports = {redirectLogin};