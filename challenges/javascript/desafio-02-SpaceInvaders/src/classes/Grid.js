import Invader from "./Invader.js";

class Grid{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;

        this.direction = "right";
        this.moveDown = false;

        this.invaderVelocity = 1;
        this.invaders = this.init();
    }

    /* criando grid de invasores */
    init(){
        const array = [];

        for (let row = 0; row < this.rows; row += 1){
            //eixo y = linhas
            for(let col = 0 ; col < this.cols; col += 1){
                const invader = new Invader(
                    //eixo x = colunas
                    {
                    x:col * 50 + 20,
                    y:row * 37 + 20,
                    },
                    this.invaderVelocity
                );
                array.push(invader);
            }
        }
        return array;
    }

    draw(ctx){
        this.invaders.forEach((invader) => invader.draw(ctx)) //desenhando cada invasor, do array do Grid
   
    }

    update(){
         if(this.reachRightBoundary()){
            this.direction = "left";
            this.moveDown = true;
        } else if(this.reachLeftBoundary()){
            this.direction = "right";
            this.moveDown = true;
        } 

            this.invaders.forEach((invader) => {
                if(this.moveDown){
                    invader.moveDown();
                    invader.incrementVelocity(0.1);
                    this.invaderVelocity = invader.velocity; /* salvando a velocidade atualizada do invasor, para quando for gerar novas grids */
                }

                if (this.direction === "right") invader.moveRight();
                if (this.direction === "left") invader.moveLeft();

            });

            this.moveDown = false;
    }

    reachRightBoundary(){ 
         return this.invaders.some( /* funcao que retorna um booleano, para avaliar os parametros baseado em quantos invasores existem */
            (invader) => invader.position.x + invader.width >= window.innerWidth /* somando com a largura do sprite do invasor, para o eixo x ficar posicionado no canto superior direito */
        ); 
    }

    reachLeftBoundary(){
         return this.invaders.some( /* funcao que retorna um booleano, para avaliar os parametros baseado em quantos invasores existem */
            (invader) => invader.position.x <= 0
        );  
    }

    getRandomInvader(){ /* escolhendo um invasor aleatório para atirar */
        const index = Math.floor(Math.random() * this.invaders.length)  /* método de números randomicos, que sempre arrendonda valores numericos para baixo */
        return this.invaders[index];
    }

    restart(){ // Conserva as variáveis e atributos de novos invasores que surgirem
        this.invaders = this.init();
        this.direction = "right";
    }

}

export default Grid;