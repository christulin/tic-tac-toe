import React from 'react';
import { Link } from 'react-router-dom';
import  Square  from './Square';

export class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }
    }

    render() {
        return (
            <>
             {/* this breaks app rn: <Link to="/" className="board-link">Go back to scoreboard</Link>*/}
            <div className="board-wrapper">
                <div className="board">
                  <div className="board-row">
                      <Square/>
                      <Square/>
                      <Square/>
                  </div>
                  <div className="board-row">
                      <Square/>
                      <Square/>
                      <Square/>
                  </div>
                  <div className="board-row">
                      <Square/>
                      <Square/>
                      <Square/>
                  </div>
              </div>
            </div>
    
    
    
    
            </>
        )

    }
}
    
