import SceneObject from './base/scene-object';

import Mouse from './input/mouse';

class Victim extends SceneObject {

    constructor(target) {
        super();

        this.target = target;
    }


    init() {


        this.width = 64;
        this.height = 64;

        this.position.x = (this.scene.width / 2) - (this.width / 2);
        this.position.y = 128;

        this.falling = false;
        this.speedInc = 0.5;
        this.show = false;
        this.min = this.target.position.x + this.width + 10;
        this.max = this.target.position.x + this.target.width - this.width - 15;
        this.image = new Image();
        this.image.src = "/victim.png";
    }

    update() {

        if (!this.show) {
            if (Mouse.x != 0 && Mouse.y != 0) {
                this.show = true;
                this.position.x = Mouse.x - (this.width / 2);
                this.position.y = Mouse.y - (this.height / 2);

            }
        }
        if (!this.falling) {
            this.position.x = Mouse.x - (this.width / 2);
            this.position.y = Mouse.y - (this.height / 2);

            if (!Mouse.isMouseDown) {
                return;
            }

            if (Mouse.x < this.min || Mouse.x > this.max) {
                return;
            }
            this.falling = true;

        }

        if (this.position.y <= this.scene.height - 100) {

            this.position.y += 2 + this.speedInc;
            this.speedInc += 0.4;
        }

    }


    draw(ctx) {

        if (!this.show) return;
        ctx.beginPath();
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.closePath();

    }


}


export default Victim;