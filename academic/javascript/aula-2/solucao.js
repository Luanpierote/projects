
class Dispesa{
    constructor(sal,min){
        this.salario = sal;
        this.salariominimo = min;
        this.dispesa = "";
    }

      imposto() {
    let resultado;
    let sal = this.salario;
    let min = this.salariominimo;

    if (sal <= min * 3) {
        resultado = sal * 0.1;
        this.dispesa = " imposto de 10%"
        return resultado

    } else if (sal > min * 3 && sal <= min * 10) {
        resultado = (sal) * 0.2;
        this.dispesa = " imposto de 20%"
        return resultado

    } else {
        resultado = (sal) * 0.3;
        this.dispesa = " imposto de 30%"
        return resultado
    }
}

}

const Obj1 = new Dispesa(5200,1250)

console.log("Voce pagará um valor final de: "+ Obj1.imposto() + ", com uma taxação de:"+ Obj1.dispesa);


//le o salario de um funcionario
//e calcula o imposto devido

//Condicionais: Se o salario 


