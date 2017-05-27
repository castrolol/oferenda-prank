import Target from "./target";
import Floor from "./floor";
import Wall from "./wall";
import TargetFront from "./target-front";
import Victim from "./victim";
import Flames from "./flames";
import FlamesInside from "./inside-flames";
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
        this.stop = true;
        Mouse.listenTo(canvas);
        Mouse.onLeave(() => {
             setTimeout(() => this.reset(), 200);
        })
    }

    start() {
        this.stop = false;
        this.init();
        this.draw();
        this.update();
    }

    reset() {
         this.sceneObjects.forEach(obj => obj.init());
    }

    init() {
        //TODO: init logic
        var target = new Target();
        var victim = new Victim(target);
        this.sceneObjects.push(new Wall());
        this.sceneObjects.push(new Floor());
        this.sceneObjects.push(target);
        this.sceneObjects.push(new FlamesInside(victim));
        this.sceneObjects.push(victim);

        this.sceneObjects.push(new TargetFront());

        this.sceneObjects.push(new Flames());

        this.sceneObjects.forEach(obj => {
            obj.attach(this);
            obj.init();
        });
        this.lastUpdate = new Date();
    }


    draw() {
        if (this.stop) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.sceneObjects.forEach(obj => obj.draw(this.ctx));
        requestAnimationFrame(() => this.draw());
    }


    update() {

        if (this.stop) return;
        var deltaTime = (new Date() - this.lastUpdate) / 1000;
        this.lastUpdate = new Date();
        this.deltaTime = deltaTime;
        this.sceneObjects.forEach(obj => obj.update());
        setTimeout(() => this.update(), 16);
    }


}


export default Scene;