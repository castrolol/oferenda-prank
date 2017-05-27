import React, { Component } from 'react';
import Scene from './scene';

class App extends Component {

  componentDidMount() {

    var scene = new Scene(this.refs.canvas);
    scene.start();

  }

  render() {
    return (
      <div className="App">
        
        <canvas ref="canvas" width="1000" height="550" />
      </div>
    );
  }
}

export default App;
