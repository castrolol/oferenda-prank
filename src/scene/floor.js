import SceneObject from './base/scene-object';

const baseUrl = window.baseUrl;

class Target extends SceneObject {


    init() {


        this.width = 200;
        this.height = 100;

        this.position.x = 0;
        this.position.y = this.scene.height - this.height;
        if (!this.image) {
            this.image = new Image();
            this.image.src = baseUrl + "/floor.png";
            this.pieces = Math.ceil(this.scene.width / this.width);
        }
    }

    update() {

    }


    draw(ctx) {
        ctx.beginPath();
        var pieces = this.pieces;
        for (var i = 0; i < pieces; i++) {

            ctx.drawImage(this.image,
                0, 0,
                this.image.width, this.image.height,
                this.width * i, this.position.y,
                this.width, this.height);

        }
        ctx.closePath();
    }

}


export default Target;