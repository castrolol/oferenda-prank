
class Scene {


    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sceneObjects = [];
    }

    start(){
        this.init();
        this.draw();
        this.update();
    }

    init(){
        //TODO: init logic
    }


    draw(){
        //TODO: draw logic
        requestAnimationFrame(() => this.draw());
    }


    update(){
        //TODO: update logic
        setTimeout(() => this.update(), 16);
    }


}


export default Scene;