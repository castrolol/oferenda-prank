import SceneObject from './base/scene-object';



class Target extends SceneObject {


    init(){


        this.width = 300;
        this.height = 230;

        this.position.x = (this.scene.width / 2) - (this.width / 2);
        this.position.y = this.scene.height - this.height;

    }

    update(){
        
    }


    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "#434343";
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();

    }


}


export default Target;