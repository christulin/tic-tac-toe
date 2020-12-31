import React from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

const Login = ({ gameOptions }) => {
  let history = useHistory();

  let goToGame = game => {
    history.push(`/${game.value}`);
  };

  return (
    <div className="route-login">
      <div className="main">
        <form>
          <h2>Welcome to Pktgmz</h2>
          <fieldset>
            <label htmlFor="game">Pick a game</label>
            <Select options={gameOptions} onChange={goToGame} className="dropdown" classNamePrefix="dropdown" />
          </fieldset>
          <button>Lets Play</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
