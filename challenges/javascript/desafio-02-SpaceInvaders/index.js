import Player from "./src/classes/Player.js";
import Grid from "./src/classes/Grid.js";
import Particle from "./src/classes/Particles.js";
import { GameState } from "./src/utils/constants.js";
import Obstacle from "./src/classes/Obstacle.js";
import SoundEffects from "./src/classes/SoundEffects.js";

const soundEffects = new SoundEffects();

const startScreen = document.querySelector(".start-screen");
const buttonControls = document.querySelector(".button-controls");
const buttonRanking = document.querySelector(".button-ranking");
const buttonReturn = document.querySelectorAll(".button-return");
const buttonRegister = document.querySelector(".button-register");
const controlsScreen = document.querySelector(".controls-screen");
const rankingScreen = document.querySelector(".ranking-screen");
const registerScreen = document.querySelector(".register");
const gameOverScreen = document.querySelector(".game-over");
const scoreUI = document.querySelector(".score-ui");
const scoreElement = document.querySelector(".score > span");
const levelElement = document.querySelector(".level > span");
const highElement = document.querySelector(".high > span");
const buttonPlay = document.querySelector(".button-play");
const buttonRestart = document.querySelector(".button-restart");
const registerForm = document.getElementById("register-form");
const usernameInput = document.getElementById("usernameInput");
const buttonMenu = document.querySelector(".button-menu");


gameOverScreen.remove();


/* o canvas funciona como uma folha de desenho */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); /* Revisar */

canvas.width = window.innerWidth; /* pode ser declarada sem window */
canvas.height = window.innerHeight;

ctx.imageSmoothingEnabled = false //suaviza os pixels da imagem

let currentState = GameState.START; //estado do jogo

const gameData = {
    score: 0,
    level: 1,
    high: 0,
}

const incrementScore = (value) => {
    gameData.score += value

    if(gameData.score > gameData.high){
        gameData.high = gameData.score;
    }
}

const showGameData = () => {
    scoreElement.textContent = gameData.score;
    levelElement.textContent = gameData.level;
    highElement.textContent = gameData.high;
}



/* por padrão, o padrão de posicionamento do eixo (0,0) 
fica localizado no canto superior esquerdo */

/* ctx.fillStyle = "red"; /* define o estilo de preenchimento, antes de desenhar 
ctx.fillRect(100, 0, 100, 100)  desenho */

let playerLifes = 2; // lógica temporária para 

const player = new Player(canvas.width, canvas.height) /* os argumentos serão enviados para o parametro do construtor */
const grid = new Grid(3, 6);

const playerProjectiles = []; // lista de projéteis do jogador
const invadersProjectiles = []; // lista de projéteis lançados
const particles = []; //lista de particulas
const obstacle = [];

const initObstacle = () => {
    const x = canvas.width / 2 - 50 /* centro da tela */
    const y = canvas.height - 250;
    const offset = canvas.width * 0.15; /* deslocamento do obstaculo */
    const color = "crimson"

    const obstacle1 = new Obstacle({ x: x - offset, y }, 100, 20, color);
    const obstacle2 = new Obstacle({ x: x + offset, y }, 100, 20, color);

    obstacle.push(obstacle1);
    obstacle.push(obstacle2);
}

initObstacle();

const keys = {
    left: false,
    right: false,
    shoot: {
        pressed: false, //tecla pressionada
        released: true, //tecla solta
    }
};

const drawObstacles = () => {
    obstacle.forEach((obstacle) => obstacle.draw(ctx));
};

const drawProjectiles = () => { //função responsável por desenhar todos os projéteis da tela
    const projectiles = [...playerProjectiles, ...invadersProjectiles] /* spread operator* para jogar todos os elementos nessa lista  */

    projectiles.forEach((projectile) => { //percorrer cada objeto do array
        projectile.draw(ctx);
        projectile.update();
    });
}

const drawParticles = () => {
    particles.forEach((particles) => {
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
        if (particle.opacity <= 0) {
            particles.splice(i, 1)
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
                soundEffects.playHitSound();

                createExplosion({ //gerando particulas ao acertar o inimigo
                    x: invader.position.x + invader.width / 2,
                    y: invader.position.y + invader.height / 2,
                },
                    10,
                    "#941cff"
                );

                //INCREMENTAR O SCORE

                incrementScore(10);


                grid.invaders.splice(invaderIndex, 1); /* remove o invasor atingido, do array de invasor */
                playerProjectiles.splice(projectileIndex, 1); /* remove o projetil que acertou o invasor, do array de projetil */

            }
        })
    });
}

const checkShootPlayer = () => {  /* hitbox do player = conferindo se algum projetil atingiu um player */
    invadersProjectiles.some((projectile, i) => {
        if (player.hit(projectile)) { /* se algum player for atingido */
            soundEffects.playExplosionSound();
            invadersProjectiles.splice(i, 1); /* remove o projetil que acertou o invasor, do array de projetil */
            gameOver();
        }
    });
};

const checkShootObstacle = () => {  /* hitbox do player = conferindo se algum projetil atingiu um player */
    obstacle.forEach((obstacle) => {
        playerProjectiles.some((projectile, i) => { /* verificando se o projetil do player colidiu com o obstaculo */
            if (obstacle.hit(projectile)) {
                playerProjectiles.splice(i, 1);
                
            }
            
        });
        invadersProjectiles.some((projectile, i) => { /* verificando se o projetil do player colidiu com o obstaculo */
            if (obstacle.hit(projectile)) {
                invadersProjectiles.splice(i, 1);
                
            }
            
        });
    })

};



const spawnGrid = () => { // geração de novos invasores
    if (grid.invaders.length === 0) {
        soundEffects.playNextLevelSound();
        
        grid.rows = Math.round(Math.random() * 9 + 1)
        grid.cols = Math.round(Math.random() * 9 + 1)
        grid.restart();

        gameData.level += 1
    }
    
}

const gameOver = () => {
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

    currentState = GameState.GAME_OVER;
    player.alive = false;
    playerLifes --;
    if(playerLifes < 2 && playerLifes > 0){
        registerScreen.classList.add("active")
         document.body.append(registerScreen); 
    }else{
    document.body.append(gameOverScreen);
    }
}

registerScreen.remove();


/* const p = new Particle({x:350,y:500}, {x:-5,y:-2},50,"crimson") */

/* looping para renderizar repetidamente a movimentação do desenho na tela, constantemente */
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentState == GameState.PLAYING) {


        showGameData();
        /*    p.draw(ctx)  particulas  */
        spawnGrid();

        drawParticles();
        drawProjectiles();
        drawObstacles();

        clearProjectiles();
        clearParticles();

        checkShootPlayer();
        checkShootInvaders();
        checkShootObstacle();

        grid.draw(ctx)
        grid.update(player.alive);

        ctx.save(); // salvou o contexto do player

        ctx.translate( //jogador movendo em torno do próprio eixos
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        );

        if (keys.shoot.pressed && keys.shoot.released) {
            soundEffects.playShootSound();
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
    }

    if (currentState === GameState.GAME_OVER) {
        drawParticles();
        drawProjectiles();
        drawObstacles();

        clearProjectiles();
        clearParticles();

        grid.draw(ctx);
        grid.update(player.alive);
    }
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

// lista com todas as telas possíveis
const screens = [startScreen, controlsScreen, rankingScreen, gameOverScreen,registerScreen];

// huds
const huds = [scoreUI];

//Função genérica de controle de classes( não preciso encaixar "display:none" em toda nova screen que crio)
const showScreen = (screen) => {
    screens.forEach(s => s.classList.remove("active")); // tira a classe "active" de todos os elementos do array, menos o que eu escolhi
    screen.classList.add("active"); // adiciona "active" apenas na tela que eu quero mostrar
}

// função para HUDs
const showHud = (hud) => {
    huds.forEach(h => h.classList.remove("active"));
    if (hud) hud.classList.add("active"); // permite "desligar todas" passando null
}

// Início do jogo
buttonPlay.addEventListener("click", () => {
    //tive que fazer uma adaptação por ser uma HUD do jogo, e não uma tela interativa
    showScreen(gameOverScreen);
    showHud(scoreUI);
    currentState = GameState.PLAYING;

    setInterval(() => {
        const invader = grid.getRandomInvader();
        if (invader) {
            invader.shoot(invadersProjectiles);
        }
    }, 1000);
});

// Ir para tela de controles
buttonControls.addEventListener("click", () => {
    showScreen(controlsScreen);
    currentState = GameState.OPTION;
});

buttonRanking.addEventListener("click", () =>{
    showScreen(rankingScreen);
    currentState = GameState.RANK;

})

// Retornar para o menu ( for each para iterar sobre todos os buttonReturn presentes no html)
buttonReturn.forEach(button => {
button.addEventListener("click", () => {
    showScreen(startScreen);
    currentState = GameState.START;
});
});

buttonMenu.addEventListener("click", ()=>{
    scoreUI.classList.remove("active");
    currentState = GameState.START;
    showScreen(startScreen);
    
    
    gameOverScreen.remove();

    gameData.score = 0;
    gameData.level = 0;

});

buttonRestart.addEventListener("click", ()=>{
    currentState = GameState.PLAYING
    player.alive = true


    grid.invaders.length = 0; /* reiniciando um array */
    grid.invaderVelocity = 1;

    invadersProjectiles.length = 0 /* reiniciando o array de projéteis */

    gameOverScreen.remove();

    gameData.score = 0
    gameData.level = 0

});

/* buttonMenu.addEventListener("click", ()=>{
    currentState = GameState.START;
    gameOverScreen.remove();
}); */

registerForm.addEventListener("submit", (e) => { // Esta função precisa ficar no início do código para poder capturar o evento
    e.preventDefault(); // impede o comportamento padrão de enviar o form

    const username = usernameInput.value.trim().toLowerCase();
    if (!username) return; // evita enviar vazio


    console.log("Usuário registrado:", username, "Score:", gameData.score);

    // Reinicia a partida (pode reutilizar a função do buttonRestart)
    currentState = GameState.PLAYING; 
    player.alive = true;
    grid.invaders.length = 0;
    grid.invaderVelocity = 1;
    invadersProjectiles.length = 0;
    gameOverScreen.remove();
    registerScreen.remove(); 
    gameData.score = 0;
    gameData.level = 0;

   
    showHud(scoreUI);
}); 



gameLoop();