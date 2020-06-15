import React, { Component } from 'react';
import Feed from './components/Feed';
import binance_logo from './img/binance_logo.png';
import './App.css';
import { logDOM } from '@testing-library/react';

class App extends Component {

  componentDidMount() {
    document.querySelector('.Container').classList.add('fade-in');
  }

  render() {
    return (
      <div className="App">
        <Feed />
      <div className="Logo Left">
        <a href="http://www.binance.com"><img src={binance_logo}></img></a>
      </div>
      <div className="Logo Right">
        <a href="https://www.github.com/verata-veritatis">
          altgrid
        </a>
      </div>
      </div>
    );
  }
}

export default App;