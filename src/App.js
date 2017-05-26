import React, { Component } from 'react'; 
import Scene from './scene';

class App extends Component {

  componentDidMount(){

    var scene = new Scene(this.refs.canvas);
    scene.start();

  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" width="800" height="500" />
      </div>
    );
  }
}

export default App;
