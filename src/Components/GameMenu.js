import React, { Component } from 'react'

export default class GameMenu extends Component {
    
  render() {
    return (
      <div>
        <div className='note'>
        <button className="save" onClick={() => this.props.handleSetScreen('Game')}>New Game</button>
        </div>
        
      </div>
    )
  }
}
