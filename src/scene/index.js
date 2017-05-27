import Target from "./target";
import TargetFront from "./target-front";
import Victim from "./victim";
import Flames from "./flames";
import Mouse from "./input/mouse";

class Scene {


    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sceneObjects = [];
        this.width = canvas.width;
        this.height = canvas.height;
        this.lastUpdate = new Date();
        this.deltaTime = 0;
        Mouse.listenTo(canvas);
    }

    start() {
        this.init();
        this.draw();
        this.update();
    }

    init() {
        //TODO: init logic

        this.sceneObjects.push(new Target());
        this.sceneObjects.push(new Victim());
        this.sceneObjects.push(new TargetFront());
        
        this.sceneObjects.push(new Flames());

        this.sceneObjects.forEach(obj => {
            obj.attach(this);
            obj.init();
        });
        this.lastUpdate = new Date();
    }


    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.sceneObjects.forEach(obj => obj.draw(this.ctx));
        requestAnimationFrame(() => this.draw());
    }


    update() {
        var deltaTime = (new Date() - this.lastUpdate) / 1000;
        this.lastUpdate = new Date();
        this.deltaTime = deltaTime;
        this.sceneObjects.forEach(obj => obj.update());
        setTimeout(() => this.update(), 16);
    }


}


export default Scene;