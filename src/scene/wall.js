import SceneObject from './base/scene-object';


const baseUrl = window.baseUrl;

class Wall extends SceneObject {


    init() {




        if (!this.image) {
            this.width = 200;
            this.height = 100;

            this.position.x = 0;
            this.position.y = 0;
            this.image = new Image();
            this.pieces = Math.ceil(this.scene.width / this.width);
            this.loaded = false;
            this.image.onload = e => {
                var desiredSize = this.scene.height - 100;
                var ratio = desiredSize / this.image.height;
                this.height = desiredSize;
                this.width = Math.ceil(this.image.width * ratio);
                this.loaded = true;

                this.pieces = Math.ceil(this.scene.width / this.width);
            };

            this.image.src = baseUrl + "/wall.jpg";
        }
    }

    update() {

    }


    draw(ctx) {
        if (!this.loaded) return;

        ctx.beginPath();
        ctx.fillStyle = "#333";
        ctx.rect(0, 0, this.scene.width, this.scene.height);
        ctx.fill();
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


export default Wall;