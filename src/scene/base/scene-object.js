import Point from './point';
import React from './rect';


class SceneObject {

    constructor(){
        this.position = new Point();
        this.height = 1;
        this.width = 1;
    }

    get bounds(){
        return new React(this.position, this.width, this.height);
    }


    attach(scene){
        this.scene = scene;
    }


    update(){

    }


    draw(ctx){

    }

}

export default SceneObject;