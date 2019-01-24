import React, { Component } from 'react';
import './App.css'

class App extends Component {
  state = {
    level: 'hard',
    color: '',
    position: 0,
    colors: [],
    message: ''
  };

  generateColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }
  
  generateBoxes = (level) => {
    const numberOfBoxes = level === 'easy' ? 3 : (level === 'not so easy' ? 6 : 9);
    let colors = [];
    for (let i = 0; i < numberOfBoxes; i++) {
      colors.push(this.generateColor())
    }
    const position = Math.floor(Math.random() * numberOfBoxes);
    const color = colors[position]
    this.setState(() => ({
      level,
      color,
      position,
      colors, 
      message: ''
    }))
  }

  selectLevel = (level) => {
    this.generateBoxes(level);
  }

  componentDidMount () {
    this.generateBoxes(this.state.level);
  }
  
  checkAnswer = (color, position, index) => {
    const newColors = (color === this.state.color) 
      ? this.state.colors.map(() => color) 
      : this.state.colors.filter(thisColor => color !== thisColor);
    const message = (color === this.state.color) ? 'Correct!' : 'Try again';
    (position === (this.state.colors.length - 1) || index < position) && position--;
    this.setState(state => ({
      ...state,
      position,
      colors: newColors,
      message
    })) 
  }
  
  playAgain = () => {
    this.generateBoxes(this.state.level);
  }

  render() {
    const { level, color, position, colors, message } = this.state;
    
    return (
      <div className="App">
        <h1>Guess the color</h1>
        <p>Pick the right color for {color}</p>
        <div className="level">
          <p>Level:</p>
          <select value={level} onChange={(event) => this.selectLevel(event.target.value)}>
            <option value="easy">Easy</option>
            <option value="not so easy">Not so easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="colorbox-container">
          {colors.map((color, index) => (
            <div key={index} className="colorbox" style={{backgroundColor: color}} onClick={() => this.checkAnswer(color, position, index)}></div>
          ))}
        </div>
        <p>{message}</p>
        <button onClick={this.playAgain}>Play again</button>
      </div>
    );
  }
}

export default App;
