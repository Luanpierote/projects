class SoundEffects {
    constructor() {

        this.shootSounds = [
            new Audio("src/assets/images/audios/shoot.mp3"),
            new Audio("src/assets/images/audios/shoot.mp3"),
            new Audio("src/assets/images/audios/shoot.mp3"),
            new Audio("src/assets/images/audios/shoot.mp3"),
            new Audio("src/assets/images/audios/shoot.mp3"),
        ]

        this.hitSounds = [
            new Audio("src/assets/images/audios/hit.mp3"),
            new Audio("src/assets/images/audios/hit.mp3"),
            new Audio("src/assets/images/audios/hit.mp3"),
            new Audio("src/assets/images/audios/hit.mp3"),
            new Audio("src/assets/images/audios/hit.mp3"),
        ]

        this.explosionsSound = new Audio("src/assets/images/audios/explosion.mp3"),
            this.nextLevelSound = new Audio("src/assets/images/audios/next_level.mp3")

        this.currentShootSound = 0; /* vai controlar o audio do disparo, alternando entre os indices */
        this.currentHitSound = 0;

    }

    playShootSound() {
        this.shootSounds[this.currentShootSound].currentTime = 0 //voltando para o primeiro index
        this.shootSounds[this.currentShootSound].play()
        this.currentShootSound =
            (this.currentShootSound + 1) % this.shootSounds.length // funciona como um looping, porque quando o array alcança 5 % 5 o resto da divisão da 0, faz com que a contagem volte do início
    }

    playHitSound() {
        this.hitSounds[this.currentHitSound].currentTime = 0
        this.hitSounds[this.currentHitSound].play()
        this.currentHitSound =
            (this.currentHitSound + 1) % this.hitSounds.length
    }

    playExplosionSound() {
        this.explosionsSound.play()
    }

    playNextLevelSound() {
        this.nextLevelSound.play()
    }

    adjustVolumes() {
        this.hitSounds.forEach(sound => sound.volume = 0.2)
        this.shootSounds.forEach(sound => sound.volume = 0.5)
        this.explosionsSound.volume = 0.2;
        this.nextLevelSound.volume = 0.4;
    }
}

export default SoundEffects;