import SceneObject from './base/scene-object';



const baseUrl = window.baseUrl;
class TargetFront extends SceneObject {


    init(){


        this.width = 300;
        this.height = 230;

        this.position.x = (this.scene.width / 2) - (this.width / 2);
        this.position.y = this.scene.height - this.height - 10;

        this.image = new Image();
        this.image.src = baseUrl + "/caldeirao_frente.png";


    }

    update(){
        
    }


    draw(ctx){
        ctx.beginPath();
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.closePath();

    }


}


export default TargetFront;