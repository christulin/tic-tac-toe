import React from 'react';
import Board from './Board';

export class ConnectFour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null
    }

    this.declareWinner = this.declareWinner.bind(this);

  }

  declareWinner(color) {
    this.setState({
      winner: color
    })
  }

  render() {

    let title;
    if (this.state.winner) {
      title = <h1>{this.state.winner} has won!</h1>
    } else {
      title = <h1>Connect Four</h1>
    }

    return (
      <div className="board-wrapper">
        {title}
        <Board declareWinner={this.declareWinner}/>
      </div>
    )
  }
}

