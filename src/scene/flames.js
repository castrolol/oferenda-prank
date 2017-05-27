import SceneObject from './base/scene-object';

function getrandom(min, max) {
    return (Math.random() * (max - min)) + min;
}

class Particle {
    constructor(x, y, xs, ys) {
        this.x = x;
        this.y = y;
        this.xs = xs;
        this.ys = ys;
        this.life = 0;
    }
}

class Flames extends SceneObject {


    constructor(target) {
        super();
        this.target = target;
        this.particles = [];
        this.max = 25;
        this.speed = 3;
        this.elapsed = 0;
    }

    init() {


        this.targetX = this.scene.width / 2;
        this.targetY = this.scene.height - 15;

    }


    addParticles() {
        var targetX = [this.targetX - 55, this.targetX + 55];
        var targetY = [this.targetY - 5, this.targetY + 5]
        var speed = this.speed;
        for (var i = 0; i < 20; i++) {

            var p = new Particle(getrandom(targetX[0], targetX[1]), getrandom(targetY[0], targetY[1]), (Math.random() * 2 * speed - speed) / 2, 0 - Math.random() * 2 * speed);
            this.particles.push(p);
        }
    }

    update() {



    }



    draw(ctx) {


        this.elapsed += this.scene.deltaTime;
        if (this.elapsed >= 0.05) {
            this.elapsed = 0;
            this.addParticles();
        }

        var maxLife = this.max;
        var size = 15;
        var speed = this.speed;

        this.particles.forEach(particle => {


            ctx.beginPath();
            var distance = Math.round(0 - Math.abs(this.targetX - particle.x)) * 3;
            ctx.fillStyle = "rgba(" + (260 - (particle.life * 2)) + "," + ((255 + distance) - (particle.life * 5)) + "," + (particle.life * 2) + "," + (((maxLife - particle.life) / maxLife) * 0.4) + ")";

            ctx.arc(particle.x, particle.y, (maxLife - particle.life) / maxLife * (size / 2) + (size / 2), 0, 2 * Math.PI);
            ctx.fill();

            particle.x += particle.xs;
            particle.y += particle.ys;

            particle.life++;


        });

        this.particles = this.particles.filter(particle => particle.life <= maxLife);


    }


}


export default Flames;