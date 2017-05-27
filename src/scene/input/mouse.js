


class Mouse {

    static listenTo(canvas) {
        Mouse.canvas = canvas;
        canvas.addEventListener("mousedown", e => {
            Mouse._isPressed = true;
        });

        canvas.addEventListener("mouseup", e => {
            Mouse._isPressed = false;
        });

        canvas.addEventListener("mousemove", e => {
            Mouse._x = e.offsetX;
            Mouse._y = e.offsetY;
        })

    }

    static onLeave(callback) {
        Mouse.canvas.addEventListener("mouseleave", e => {
            callback();
        });
    }

    static get isMouseDown() {
        return Mouse._isPressed;
    }

    static get x() {
        return Mouse._x || 0;
    }

    static get y() {
        return Mouse._y || 0;
    }

}


export default Mouse;