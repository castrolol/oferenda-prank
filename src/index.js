import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (~window.baseUrl.indexOf("%")) {
    window.baseUrl = "";
}


ReactDOM.render(<App />, document.getElementById('root'));
