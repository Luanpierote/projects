import Player from "./classes/Player.js";

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

const keys = {
    left: false,
    right:false,
};

/* looping para renderizar repetidamente a movimentação do desenho na tela */
const gameLoop = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)

    /* player.position.x += 1;  suaviza a animação, por estar sendo executado várias vezes */
    if (keys.left && player.position.x >= 0){
        player.moveLeft();
    }

    /* desloca o eixo do canto superior esquerdo, para o superior direito, e realiza a comparação */
    if (keys.right && player.position.x <= canvas.width - player.width){
        player.moveRight();
    }

    player.draw(ctx);

    window.requestAnimationFrame(gameLoop) /* só chama a função quando necessário*/
};

addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "a") keys.left = true;

    if (key === "d") keys.right = true;  

});

addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    if (key === "a")  keys.left = false;

    if (key === "d")  keys.right = false;


});

gameLoop();