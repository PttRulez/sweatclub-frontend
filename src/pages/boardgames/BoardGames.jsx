import { useEffect, useState } from 'react';
import api from '../../api/api';
import BoardgameItem from './partials/BoardgameItem';
import AddButton from '../../components/UI/AddButton';
import { useSelector } from 'react-redux';
import MyModal from '../../components/UI/Modal/MyModal';
import BoardGameForm from './BoardgameForm';

const BoardGames = () => {
  const [boardgames, setBoardgames] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  
  const user = useSelector((state) => state.auth.user);

  function fetchBoardGames() {
    api
      .get('/boardgames')
      .then((response) => {
        setBoardgames(response.data.data);
      })
      .catch((err) => console.log('ERROR FETCHING GAMES IN Boardgame component', err));
  }

  useEffect(() => {
    document.title = 'Коллекция настолок';
    fetchBoardGames();
  }, []);

  function afterBoardGameCreate() {
    setCreateVisible(false);
    fetchBoardGames();
  }

  return (
    <>
      {user.isAdmin && (
        <>
          <AddButton onClick={() => setCreateVisible(true)}>+</AddButton>
          <MyModal visible={createVisible} setVisible={setCreateVisible}>
            <BoardGameForm afterSubmit={afterBoardGameCreate} edit={false} />
          </MyModal>
        </>
      )}
      <section className='flex flex-wrap'>
        {boardgames.map((boardgame) => (
          <BoardgameItem boardgame={boardgame} key={boardgame.name} />
        ))}
      </section>
    </>
  );
};

export default BoardGames;
