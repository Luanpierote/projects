
let salario = 5200;
let salariominimo = 1250;


function imposto(taxa) {
    let resultado;
    taxa = 0.1;

    if (salario <= salariominimo * 3) {
        let resultado;
        resultado = salario * taxa;
        console.log("imposto de 10%")


    } else if (salario > salariominimo * 3 && salario <= salariominimo * 10) {
        resultado = (salario) * taxa * 2;
        console.log("imposto de 20%")

    } else {
        resultado = (salario) * taxa * 3;
        console.log("imposto de 30%")
    }
    console.log(resultado);
}

imposto();



//le o salario de um funcionario
//e calcula o imposto devido

//Condicionais: Se o salario 


