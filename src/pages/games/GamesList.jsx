import { useEffect, useState } from 'react';
import GameItem from './partials/GameItem';
import api from '../../api/api';
import AddButton from '../../components/UI/AddButton';
import { useSelector } from 'react-redux';
import MyModal from '../../components/UI/Modal/MyModal';
import GameForm from './GameForm';
import cl from './css/games.module.css';
import Loader from '../../components/UI/Loader';

const GamesList = () => {
  const user = useSelector(state => state.auth.user);
  const [games, setGames] = useState([]);
  const [gameFormVisible, setGameFormVisible] = useState(false);
  const [img, setImg] = useState(false);
  const [edit, setEdit] = useState(false);
  const [gameIdToEdit, setGameIdToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameFormKey, setGameFormKey] = useState(1);
  const club = useSelector(state => state.general.club);

  function fetchGames() {
    setLoading(true);
    api
      .get('/games', {
        params: {
          club_id: club?.id,
        },
      })
      .then(response => {
        setLoading(false);
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
    setGameFormVisible(false);
    fetchGames();
  }

  function openGameModal(gameId = null) {
    if (gameId) {
      setEdit(true);
      setGameIdToEdit(gameId);
    } else {
      setEdit(false);
    }

    setGameFormVisible(true);
    setGameFormKey(gameFormKey + 1);
  }

  return (
    <>
      {loading ? (
        <Loader addClasses={'w-52 h-52'}/>
      ) : (
        <>
          {user?.isAdmin && (
            <>
              <AddButton onClick={() => openGameModal(null)}>+</AddButton>
              {gameFormVisible && (
                <MyModal visible={gameFormVisible} setVisible={setGameFormVisible}>
                  <GameForm
                    afterSubmit={afterGameCreate}
                    edit={edit}
                    gameId={gameIdToEdit}
                    key={gameFormKey}
                  />
                </MyModal>
              )}
            </>
          )}

          <br />
          <div className='flex flex-col items-end md:flex-row md:justify-center md:flex-wrap'>
            {games.map(game => (
              <GameItem
                game={game}
                key={game.id}
                showGamePhoto={setImg}
                pencilClick={openGameModal}
              />
            ))}
          </div>

          <MyModal visible={img} setVisible={setImg}>
            <img src={String(img)} alt='' className={cl.photo} />
          </MyModal>
        </>
      )}
    </>
  );
};

export default GamesList;
