import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendarDays, faPencil } from '@fortawesome/free-solid-svg-icons';
import { generateAvatar } from '../../../app/helpers';
import { Link } from 'react-router-dom';

const GameItem = ({ game, showGamePhoto, pencilClick, ...props }) => {
  return (
    <div className='w-full md:w-fit h-1/3 flex items-center justify-evenly md:justify-center border-2 mb-2 p-3 border-gray-400 mr-2'>
      {/* ----------------------------------------------- INFO ------------------------------------------------------------- */}
      <div className='mb-8 flex flex-col'>
        <div className='flex flex-col w-32 text-center'>
          <p className='text-sm text-blue-400  flex justify-center items-center '>
            <FontAwesomeIcon icon={faCalendarDays} className='mr-2' />
            {game.date_played}
            {/* <Link to={`/games/${game.id}/edit`}> */}
            <FontAwesomeIcon
              icon={faPencil}
              className='ml-2 cursor-pointer'
              onClick={() => pencilClick(game.id)}
            />
            {/* </Link> */}
          </p>
          <p className='text-moyTsvet font-bold text-xl mb-2'>{game.boardgame.name}</p>
          <Link to={`/boardgames/${game.boardgame.id}`}>
            <img src={game.boardgame.imageUrl} alt='' className='h-32 w-32 object-contain' />
          </Link>
        </div>
      </div>

      {/* ----------------------------------------------- PHOTO and PLAYERS ------------------------------------------------------------- */}
      <div className='flex flex-col md:flex-row items-center justify-between'>
        {/* ----------------------- PLAYERS ----------------------------- */}
        <div className='flex flex-col px-5'>
          {game.players.map(player => (
            <Link
              to={`/profile/${player.id}`}
              className='flex items-center px-2 mb-1'
              key={player.nickname}
            >
              <img
                className='w-10 h-10 rounded-full mr-4'
                src={player.avatarUrl || generateAvatar(player.nickname)}
                alt='Avatar of Writer'
              />
              <div className='text-sm flex flex-col items-start'>
                <p className='text-gray-900 leading-none'>{player.nickname}</p>
                <div className='text-sm '>
                  {player.points ? <span className='text-gray-600 mr-2'>{player.points}</span> : ''}
                  {Boolean(player.winner) && (
                    <FontAwesomeIcon icon={faCrown} className='text-yellow-700' />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ---------------- GAME PHOTO -------------------- */}
        {game.photoUrl && (
          <div>
            <div className='flex justify-center'>
              <img
                src={game.photoUrl ?? ''}
                alt=''
                className='max-h-32 cursor-pointer'
                onClick={() => showGamePhoto(game.photoUrl)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameItem;
