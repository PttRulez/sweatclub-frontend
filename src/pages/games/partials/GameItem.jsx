import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faCalendarDays,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { generateAvatar } from '../../../app/helpers';
import { Link } from 'react-router-dom';

const GameItem = ({ game, showGamePhoto, ...props }) => {
  return (
    <div className='w-fit h-1/3 flex items-center border-2 mb-2 p-3 border-gray-400 mr-2'>
      {/* ----------------------------------------------- INFO ------------------------------------------------------------- */}
      <div className='mb-8 flex flex-col'>
        <div className='flex flex-col items-center'>
          <p className='text-sm text-blue-400  flex justify-center items-center'>
            <FontAwesomeIcon icon={faCalendarDays} className='mr-2' />
            {game.date_played}
            <Link to={`/games/${game.id}/edit`}>
              <FontAwesomeIcon icon={faPencil} className='ml-2' />
            </Link>
          </p>
          <p className='text-moyTsvet font-bold text-xl mb-2'>
            {game.boardgame.name}
          </p>
          <img src={game.boardgame.imageUrl} alt='' className='w-32' />
        </div>
      </div>

      {/* ----------------------------------------------- PHOTO and PLAYERS ------------------------------------------------------------- */}
      <div className='flex justify-between'>

        {/* ----------------------- PLAYERS ----------------------------- */}
        <div className='flex flex-col justify-evenly px-5'>
          {game.players.map((player) => (
            <Link
              to={`/profile/${player.id}`}
              className='flex items-center px-2'
              key={player.nickname}
            >
              <img
                className='w-10 h-10 rounded-full mr-4'
                src={player.avatarUrl || generateAvatar(player.nickname)}
                alt='Avatar of Writer'
              />
              <div className='text-sm'>
                <p className='text-gray-900 leading-none'>{player.nickname}</p>
                <div className='text-sm flex justify-evenly items-center'>
                  {Boolean(player.winner) && (
                    <FontAwesomeIcon
                      icon={faCrown}
                      className='text-yellow-700'
                    />
                  )}
                  {player.points ? (
                    <span className='text-gray-600 '>{player.points}</span>
                  ) : (
                    ''
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
              <img src={game.photoUrl} alt='' className='max-h-32 cursor-pointer' onClick={ () => showGamePhoto(game.photoUrl) }/>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GameItem;