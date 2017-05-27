import SceneObject from './base/scene-object';
import Mouse from './input/mouse';

const baseUrl = window.baseUrl;
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


    constructor(victim) {
        super();
        this.victim = victim;
        this.particles = [];
        this.max = 25;
        this.speed = 4;
        this.elapsed = 0;
        this.putFire = 0;
        this.firePoint = 0;
        this.alreadyFired = false;
    }

    init() {


        this.targetX = this.scene.width / 2;
        this.targetY = this.scene.height - 120;
        this.firePoint = this.targetY - 30;
        this.sound = new Audio(baseUrl + "/burn.mp3");
        this.sound.autoplay = false;
        this.sound.load(); 
        this.sound.loop = false;
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

        if (this.putFire > 0) {
            this.putFire -= this.scene.deltaTime * 1.5;
        } else {
            this.putFire = 0;
            var canBurn = true;
            canBurn = canBurn && this.victim.falling;
            canBurn = canBurn && !this.alreadyFired;
            canBurn = canBurn && this.victim.position.y >= this.firePoint;


            if (canBurn) {
                this.putFire = 3;
                this.alreadyFired = true;
                this.sound.play();
            }
        }



    }




    draw(ctx) {

        this.elapsed += this.scene.deltaTime;
        if (this.elapsed >= 0.05) {
            this.elapsed = 0;
            this.addParticles();
        }


        var maxLife = this.max + (this.putFire * 4);
        var size = 15;
        if (this.putFire) {
            size += this.putFire * 5;
        }
        var speed = this.speed + (this.putFire * 2);

        this.particles.forEach(particle => {


            ctx.beginPath();
            var distance = Math.round(0 - Math.abs(this.targetX - particle.x)) * 3;

            if (this.putFire > 0) {
                ctx.fillStyle = "rgba(" + (260 - (particle.life * 2)) + "," + ((255 + distance) - (particle.life * 5)) + "," + (particle.life * 2) + "," + (((maxLife - particle.life) / maxLife) * 0.4) + ")";

            } else {
                var color = (60 - (particle.life * 2));
                ctx.fillStyle = "rgba(" + color + "," + color + "," + color + "," + (((maxLife - particle.life) / maxLife) * 0.4) + ")";
            }
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