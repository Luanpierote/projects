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
            for(let col =0 ; col < this.cols; col += 1){
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
       /*  if(chegouNaBordaDireita){
            this.direction = "left";
            this.moveDown = true;
        } else if(chegouNaBordaEsquerda){
            this.direction = "right";
            this.moveDown = true;
        } */

            this.invaders.forEach((invader) => {
                if(this.moveDown){
                    invader.moveDown();
                }

                if (this.direction === "right") invader.moveRight();
                if (this.direction === "left") invader.moveLeft();

            });

            this.moveDown = false;
    }

    reachRightBoundary(){

    }

    reachLeftBoundary(){
        
    }

}

export default Grid;