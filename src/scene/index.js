import Target from "./target";
import Victim from "./victim";


class Scene {


    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sceneObjects = [];
        this.width = canvas.width;
        this.height = canvas.height;
    }

    start(){
        this.init();
        this.draw();
        this.update();
    }

    init(){
        //TODO: init logic

        this.sceneObjects.push(new Target());
        this.sceneObjects.push(new Victim());


        this.sceneObjects.forEach( obj => {
            obj.attach(this);
            obj.init();
        });

    }


    draw(){
        this.sceneObjects.forEach(obj => obj.draw(this.ctx));
        requestAnimationFrame(() => this.draw());
    }


    update(){
        this.sceneObjects.forEach(obj => obj.update());
        setTimeout(() => this.update(), 16);
    }


}


export default Scene;