import './App.css';

import React, { Component } from 'react';
import Game from './Components/Game';
import GameMenu from './Components/GameMenu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'GameMenu'//GameMenu,Game
    };
  }

  handleSetScreen = (screenName) => {
    this.setState({ screen: screenName });
  }

  render() {
    if (this.state.screen=='GameMenu') {
      return (
        <div className='container'>
            <GameMenu handleSetScreen={this.handleSetScreen} />
        </div>
      )
    }
    else{
      return (
        <div className='container'>
            <Game />
        </div>
      )
    }
    
  }
}


export default App;
