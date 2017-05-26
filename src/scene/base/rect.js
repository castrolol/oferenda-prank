import Point from './point';


class Rect {

    constructor(point, w, h){
        this.point = point || new Point();
        this.w = w || 0;
        this.h = h || 0;
    }

}

export default Rect;