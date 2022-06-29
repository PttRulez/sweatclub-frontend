import { useEffect, useState } from 'react';
import GameItem from './partials/GameItem';
import api from '../../api/api';
import AddButton from '../../components/UI/AddButton';
import { useSelector } from 'react-redux';
import MyModal from '../../components/UI/Modal/MyModal';
import GameForm from './GameForm';
import cl from './css/games.module.css';

const GamesList = () => {
  const user = useSelector(state => state.auth.user);
  const [games, setGames] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [img, setImg] = useState(false);
  const [gameFormKey, setGameFormKey] = useState(1);
  const club = useSelector(state => state.general.club);

  function fetchGames() {
    api
      .get('/games', {
        params: {
          club_id: club?.id,
        },
      })
      .then(response => {
        setGames(response.data.data);
      })
      .catch(err => {
        console.log('ERROR FETCHING GAMES IN GAME LIST', err);
      });
  }

  useEffect(() => {
    document.title = 'Потный клуб';
    fetchGames();
  }, [club]);

  function afterGameCreate() {
    setCreateVisible(false);
    fetchGames();
  }

  function openCreateGameModal() {
    setCreateVisible(true);
    setGameFormKey(gameFormKey + 1);
  }

  return (
    <>
      {user.isAdmin && (
        <>
          <AddButton onClick={openCreateGameModal}>+</AddButton>
          <MyModal visible={createVisible} setVisible={setCreateVisible}>
            <GameForm afterSubmit={afterGameCreate} edit={false} key={gameFormKey} />
          </MyModal>
        </>
      )}

      <br />
      <div className='flex flex-col items-end lg:flex-row lg:justify-center lg:flex-wrap'>
        {games.map(game => (
          <GameItem game={game} key={game.id} showGamePhoto={setImg} />
        ))}
      </div>

      <MyModal visible={img} setVisible={setImg}>
        <img src={String(img)} alt='' className={cl.photo} />
      </MyModal>
    </>
  );
};

export default GamesList;
