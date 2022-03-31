import { useEffect, useState } from 'react';
import api from '../../api/api';
import { NavLink } from 'react-router-dom';
import Boardgame from './Boardgame';
import AddButton from '../../components/UI/AddButton';

const BoardGames = () => {
  const [boardgames, setBoardgames] = useState([]);

  function fetchGames() {
    api
      .get('/boardgames')
      .then((response) => {
        setBoardgames(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <AddButton to='/add-boardgame'>+</AddButton>
      <section className='flex flex-wrap'>
        {boardgames.map((boardgame) => (
          <Boardgame boardgame={boardgame} key={boardgame.id}></Boardgame>
        ))}
      </section>
    </>
  );
};

export default BoardGames;
