import { useEffect, useState } from 'react';
import GameItem from './partials/GameItem';
import api from '../../api/api';
import AddButton from '../../components/UI/AddButton';
import { useSelector } from 'react-redux';
import MyModal from '../../components/UI/Modal/MyModal';
import GameForm from './GameForm';

const GamesList = () => {
  const user = useSelector((state) => state.auth.user);
  const [games, setGames] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [img, setImg] = useState(false);

  function fetchGames() {
    api
      .get('/games')
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  }

  useEffect(() => {
    fetchGames();
  }, []);

  function afterGameCreate() {
    setCreateVisible(false);
    fetchGames();
  }
 
  return (
    <>
      {user.isAdmin && (
        <>
          <AddButton onClick={() => setCreateVisible(true)}>+</AddButton>
          <MyModal visible={createVisible} setVisible={setCreateVisible}>
            <GameForm afterSubmit={afterGameCreate} edit={false}/>
          </MyModal>
        </>
      )}

      <br />
      <div className='flex justify-center flex-wrap'>
        {games.map((game) => (
          <GameItem game={game} key={game.id} showGamePhoto={setImg} />
        ))}
      </div>

      <MyModal visible={img} setVisible={setImg} className='w-2/3'>
        <img src={img} alt='' />
      </MyModal>
    </>
  );
};

export default GamesList;
