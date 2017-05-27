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
        this.speed = 4;
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

            //Adds a particle at the mouse position, with random horizontal and vertical speeds
            var p = new Particle(getrandom(targetX[0], targetX[1]), getrandom(targetY[0], targetY[1]), (Math.random() * 2 * speed - speed) / 2, 0 - Math.random() * 2 * speed);
            this.particles.push(p);
        }
    }

    update() {

        this.elapsed += this.scene.deltaTime;
        if (this.elapsed >= 0.05) {
            this.elapsed = 0;
            this.addParticles();
        }


    }



    draw(ctx) {
        debugger;
        var maxLife = this.max;
        var size = 15;
        var speed = this.speed;

        this.particles.forEach(particle => {


            ctx.beginPath();
            var distance = Math.round(0 - Math.abs(this.targetX - particle.x)) * 3;
            ctx.fillStyle = "rgba(" + (260 - (particle.life * 2)) + "," + ((255 + distance) - (particle.life * 5)) + "," + (particle.life * 2) + "," + (((maxLife - particle.life) / maxLife) * 0.4) + ")";

            //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
            ctx.arc(particle.x, particle.y, (maxLife - particle.life) / maxLife * (size / 2) + (size / 2), 0, 2 * Math.PI);
            ctx.fill();

            //Move the particle based on its horizontal and vertical speeds
            particle.x += particle.xs;
            particle.y += particle.ys;

            particle.life++;
            //If the particle has lived longer than we are allowing, remove it from the array.



        });

        this.particles = this.particles.filter(particle => particle.life <= maxLife);


    }


}


export default Flames;