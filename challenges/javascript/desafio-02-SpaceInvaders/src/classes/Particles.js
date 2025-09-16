class Particle{

    constructor(position,velocity,radius,color){
        this.position = position;
        this.velocity = velocity;
        this.radius = radius; /* tamanho do circulo */
        this.color = color;
        this.opacity = 1;
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath(); /* evita bugs ao criar caminhos */
        ctx.globalAlpha = this.opacity; //controle da opacidade 
        ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2 /* completando o circulo em radianos */
    

        );
        ctx.fillStyle = this.color /* estilo de preenchimento = cor do circulo */
        ctx.fill() /* preenchimento */
        ctx.closePath() //fechando o caminho
        ctx.restore();
    }

    update(){
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.opacity = this.opacity - 0.008 <= 0 ? 0 : this.opacity - 0.008;
    }
}

export default Particle;