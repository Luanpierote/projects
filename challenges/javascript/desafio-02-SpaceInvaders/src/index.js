import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Invader from "./classes/Invader.js";
import Grid from "./classes/Grid.js";

/* o canvas funciona como uma folha de desenho */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); /* Revisar */

canvas.width = window.innerWidth; /* pode ser declarada sem window */
canvas.height = window.innerHeight;

ctx.imageSmoothingEnabled = false //suaviza os pixels da imagem

/* por padrão, o padrão de posicionamento do eixo (0,0) 
fica localizado no canto superior esquerdo */

/* ctx.fillStyle = "red"; /* define o estilo de preenchimento, antes de desenhar 
ctx.fillRect(100, 0, 100, 100)  desenho */

const player = new Player(canvas.width, canvas.height) /* os argumentos serão enviados para o parametro do construtor */
const grid = new Grid(3,6);

const playerProjectiles = []; // lista de projéteis do jogador
const invadersProjectiles = [];


const keys = {
    left: false,
    right:false,
    shoot: {
        pressed: false, //tecla pressionada
        released: true, //tecla solta
    }
};

const drawProjectiles = () =>{ //função responsável por desenhar todos os projéteis da tela
    const projectiles = [...playerProjectiles, ...invadersProjectiles] /* spread operator* para jogar todos os elementos nessa lista  */
    
    projectiles.forEach((projectile) => { //percorrer cada objeto do array
        projectile.draw(ctx);
        projectile.update();
    });
}

const clearProjectiles = () =>{

    playerProjectiles.forEach((projectile,index)=>{
        if(projectile.position.y <= 0){ //se o projétil sair da página
            playerProjectiles.splice(index, 1); // Posição do elemento que deseja remover x Quantidade de elementos que deseja remover 
        } 
    })

}

/* looping para renderizar repetidamente a movimentação do desenho na tela */
const gameLoop = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawProjectiles();
    clearProjectiles();

    grid.draw(ctx)
    grid.update(); 
    
    ctx.save(); // salvou o contexto do player
    
    

    ctx.translate( //jogador movendo em torno do próprio eixos
        player.position.x + player.width/2, 
        player.position.y + player.height/2
    ); 

    if(keys.shoot.pressed && keys.shoot.released){
        player.shoot(playerProjectiles)
        keys.shoot.released = false;
        
    }

    /* player.position.x += 1;  suaviza a animação, por estar sendo executado várias vezes */
    if (keys.left && player.position.x >= 0){
        player.moveLeft();
        ctx.rotate(-0.15); // está girando o eixo inteiro! Para resolver, é necessário deslocar o ctx(contexto)
    }

    /* desloca o eixo do canto superior esquerdo, para o superior direito, e realiza a comparação */
    if (keys.right && player.position.x <= canvas.width - player.width){
        player.moveRight();
        ctx.rotate(0.15);
    }

    ctx.translate( //restaurando a posição do eixo da página da página (necessária!)
        - player.position.x - player.width/2, 
        - player.position.y - player.height/2
    ); 

    player.draw(ctx);

    ctx.restore(); //restaurando o estado original do player, para ele não ficar girando em torno do próprio eixo

    window.requestAnimationFrame(gameLoop) /* só chama a função quando necessário*/
};

addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "a") keys.left = true;

    if (key === "d") keys.right = true;  

    if (key === "k") keys.shoot.pressed = true; // key space = " "

});

addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    if (key === "a")  keys.left = false;

    if (key === "d")  keys.right = false;

    if (key === "k"){
         keys.shoot.pressed = false;
         keys.shoot.released = true;
    }
});

setInterval(()=>{
    const invader = grid.getRandomInvader()

    if(invader){
        invader.shoot(invadersProjectiles);
    }
},1000);

gameLoop();