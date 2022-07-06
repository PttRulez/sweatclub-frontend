import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import GameItem from '../games/partials/GameItem';
import MyModal from '../../components/UI/Modal/MyModal';

const Boardgame = () => {
  const user = useSelector(state => state.auth.user);
  const { id: boardgameId } = useParams();
  const [boardgame, setBoardgame] = useState({});
  const [games, setGames] = useState([]);
  const [img, setImg] = useState(false);

  useEffect(() => {
    api.get(`boardgames/${boardgameId}`).then(res => {
      setBoardgame(res.data.boardgame);
      setGames(res.data.games);
    });
  }, []);

  return (
    <>
      <div className='mt-10'>
        <div className='text-center block md:inline-block md:float-left'>
          <img src={boardgame.imageUrl} alt={`${boardgame.name} avatar`} />
          <div className='flex items-center justify-center gap-x-2'>
            <h1>{boardgame.name}</h1>
            {user.isAdmin && (
              <Link to={`/boardgames/${boardgame.id}/edit`} className='text-xs'>
                <FontAwesomeIcon icon={faPencil} />
              </Link>
            )}
          </div>
        </div>
        <div className='flex flex-wrap justify-evenly mt-10'>
          {games.map(game => {
            return <GameItem game={game} showGamePhoto={setImg} key={`game_${game.id}`} />;
          })}
        </div>
      </div>

      <MyModal visible={img} setVisible={setImg} className='w-2/3'>
        <img src={String(img)} alt='' />
      </MyModal>
    </>
  );
};

export default Boardgame;
