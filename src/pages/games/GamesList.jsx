import { useEffect, useState } from 'react';
import Game from './Game';
import api from '../../api/api';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const authToken = useSelector((state) => state.authToken.token);

  function fetchGames() {
    api
      .get('/games')
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log(authToken);
    fetchGames();
  }, []);

  return (
    <div className='mt-10 text-center'>
      <NavLink
        to='/addgame'
        className='inline-block text-white font-bold bg-blue-500 rounded-full absolute right-20 text-center p-4'
      >
        +
      </NavLink>
      <br />
      {games.map((game) => (
        <Game game={game} key={game.id}></Game>
      ))}
    </div>
  );
};

export default GamesList;
