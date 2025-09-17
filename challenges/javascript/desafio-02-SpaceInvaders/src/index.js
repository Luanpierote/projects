import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Invader from "./classes/Invader.js";
import Grid from "./classes/Grid.js";
import Particle from "./classes/Particles.js";

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
const grid = new Grid(3, 6);

const playerProjectiles = []; // lista de projéteis do jogador
const invadersProjectiles = []; // lista de projéteis lançados
const particles = []; //lista de particulas


const keys = {
    left: false,
    right: false,
    shoot: {
        pressed: false, //tecla pressionada
        released: true, //tecla solta
    }
};

const drawProjectiles = () => { //função responsável por desenhar todos os projéteis da tela
    const projectiles = [...playerProjectiles, ...invadersProjectiles] /* spread operator* para jogar todos os elementos nessa lista  */

    projectiles.forEach((projectile) => { //percorrer cada objeto do array
        projectile.draw(ctx);
        projectile.update();
    });
}

const drawParticles = () =>{
    particles.forEach((particles)=>{
        particles.draw(ctx)
        particles.update()
    });
}

const clearProjectiles = () => { /* deletar os projeteis do array */

    playerProjectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) { //se o projétil sair da página
            playerProjectiles.splice(index, 1); // Posição do elemento que deseja remover x Quantidade de elementos que deseja remover 
        }
    })
};

const clearParticles = () => {

    particles.forEach((particle, i) => {
        if (particle.opacity <= 0){
            particles.splice(i,1)
        }
        
    })
};

const createExplosion = (position, size, color) => { /* criando particulas aleatórias */
    for (let i = 0; i < size; i++) {
        const particle = new Particle(
            {
                x: position.x,
                y: position.y,
            },
            {
                x: Math.random() - 0.5 * 1.5,
                y: Math.random() - 0.5 * 1.5,
            }, 
            2,
             color
            );

            particles.push(particle)
    }

}

const checkShootInvaders = () => {  /* hitbox do Invasor = conferindo se algum projetil atingiu um invasor */
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (invader.hit(projectile)) { /* se algum invasor for atingido */
                createExplosion({ //gerando particulas ao acertar o inimigo
                    x: invader.position.x + invader.width / 2,
                    y: invader.position.y + invader.height / 2,
                    },
                    10,
                    "#941cff"
                ); 

                grid.invaders.splice(invaderIndex, 1); /* remove o invasor atingido, do array de invasor */
                playerProjectiles.splice(projectileIndex, 1); /* remove o projetil que acertou o invasor, do array de projetil */

            }
        })
    });
}

const checkShootPlayer = () => {  /* hitbox do player = conferindo se algum projetil atingiu um player */
        invadersProjectiles.some((projectile,i) => {
            if (player.hit(projectile)) { /* se algum player for atingido */
            invadersProjectiles.splice(i, 1); /* remove o projetil que acertou o invasor, do array de projetil */
                gameOver();
            }
        });
    };

    const spawnGrid = () => { // geração de novos invasores
        if(grid.invaders.length === 0){
            grid.rows = Math.round(Math.random() * 9 + 1 )
            grid.cols = Math.round(Math.random() * 9 + 1 )
            grid.restart();
        }
    }

    const gameOver = () =>{
        createExplosion({ //gerando particulas ao acertar o player
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2,
                    },
                    10,
                    "white"
                ); 
                createExplosion({ //gerando particulas ao acertar o player
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2,
                    },
                    10,
                    "#4d9be6"
                ); 
                createExplosion({ //gerando particulas ao acertar o player
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2,
                    },
                    10,
                    "crimson"
                ); 

    }


/* const p = new Particle({x:350,y:500}, {x:-5,y:-2},50,"crimson") */

/* looping para renderizar repetidamente a movimentação do desenho na tela */
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /*    p.draw(ctx)  particulas  */
    spawnGrid();

    drawParticles();
    drawProjectiles();
    clearProjectiles();
    clearParticles();
    
    checkShootPlayer();
    checkShootInvaders();

    grid.draw(ctx)
    /* grid.update();  */  

    ctx.save(); // salvou o contexto do player



    ctx.translate( //jogador movendo em torno do próprio eixos
        player.position.x + player.width / 2,
        player.position.y + player.height / 2
    );

    if (keys.shoot.pressed && keys.shoot.released) {
        player.shoot(playerProjectiles)
        keys.shoot.released = false;

    }

    /* player.position.x += 1;  suaviza a animação, por estar sendo executado várias vezes */
    if (keys.left && player.position.x >= 0) {
        player.moveLeft();
        ctx.rotate(-0.15); // está girando o eixo inteiro! Para resolver, é necessário deslocar o ctx(contexto)
    }

    /* desloca o eixo do canto superior esquerdo, para o superior direito, e realiza a comparação */
    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight();
        ctx.rotate(0.15);
    }

    ctx.translate( //restaurando a posição do eixo da página da página (necessária!)
        - player.position.x - player.width / 2,
        - player.position.y - player.height / 2
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

    if (key === "a") keys.left = false;

    if (key === "d") keys.right = false;

    if (key === "k") {
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }
});

setInterval(() => { /* ativando a função de atirar dos invasores, a cada 1 segundo */
    const invader = grid.getRandomInvader()

    if (invader) {
        invader.shoot(invadersProjectiles);
    }
}, 1000);

gameLoop();