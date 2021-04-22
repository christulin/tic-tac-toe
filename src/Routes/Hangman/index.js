import faker from 'faker';
import React from 'react';

const Letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const GameOver = <h1>Game Over :(</h1>;

const isWinnerFunc = (word, guessedLetters) => {
  let isWinner = false;
  let breaker = word.toLowerCase().split('');

  guessedLetters.forEach(letter => {
    let isRemove = breaker.includes(letter);

    if (isRemove) {
      breaker.splice(breaker.indexOf(letter), 1);
    }
  });

  if (!breaker.length) {
    isWinner = true;
  }

  return isWinner;
};

export class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessedLetters: [],
      guessesLeft: 6,
      word: faker.animal.dog(),
      isWin: false,
    };

    this.guessLetter = this.guessLetter.bind(this);
  }

  guessLetter(letter = null) {
    let guessedLetters = [...this.state.guessedLetters];
    let isAlreadyGuessed = guessedLetters.includes(letter);
    let isWrong = !this.state.word.toLowerCase().split('').includes(letter);

    if (isAlreadyGuessed) {
      console.log('guessed already);');
    } else if (!isAlreadyGuessed && !isWrong) {
      guessedLetters.push(letter);

      this.setState(
        {
          guessedLetters,
        },
        () => {
          let isWin = isWinnerFunc(this.state.word, this.state.guessedLetters);
          this.setState({ isWin });
        }
      );
    } else if (isWrong) {
      let guessesLeft = this.state.guessesLeft - 1;

      this.setState({
        guessesLeft,
      });
    }
  }

  render() {
    let isGameOver = !this.state.guessesLeft;
    let isWin = this.state.isWin;

    if (isGameOver) {
      return GameOver;
    } else if (isWin) {
      return <h1>YOU WON!</h1>;
    } else {
      return (
        <div className="hangman">
          <br />
          <h4>Guesses Left: {this.state.guessesLeft}</h4>
          <h5>
            Word:
            {this.state.word
              .toLowerCase() // SOS
              .split('')
              .map(letter => {
                let isCorrect = this.state.guessedLetters.includes(letter);
                return isCorrect ? <span>{letter}</span> : <span>_</span>;
              })}
          </h5>
          <hr />
          {Letters.map(letter => (
            <span onClick={() => this.guessLetter(letter)} style={{ marginRight: '5px' }}>
              {letter}
            </span>
          ))}
        </div>
      );
    }
  }
}
