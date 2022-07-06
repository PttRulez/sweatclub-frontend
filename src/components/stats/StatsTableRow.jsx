import {
  faAngleUp,
  faAngleDown,
  faMedal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { generateAvatar } from '../../app/helpers';

const StatsTableRow = ({ stats, place }) => {
  const [opened, setOpened] = useState(false);
  let medalColor = '';
  if (place < 4) {
    const colors = {
      1: 'text-yellow-400',
      2: 'text-slate-600',
      3: 'text-amber-800'
    }
    medalColor = colors[place];
  }

  return (
    <>
      <tr className='leading-10 border-slate-400 border-b py-2 hover:bg-purple-200 transition-colors duration-200 delay-50 ease-in cursor-pointer' onClick={() => setOpened(!opened)}>
        <td className='align-middle flex justify-start items-center text-sm last:py-2 pl-4 sm:pl-20 py-2 text-center'>
          <img
            className='w-6 h-6 sm:w-10 sm:h-10 rounded-full mr-2'
            src={stats.user.avatarUrl || generateAvatar(stats.user.nickname)}
            alt='Avatar of Writer'
          />
          
          <span>{stats.user.nickname}</span>

          {place < 4 && <FontAwesomeIcon
            icon={faMedal}
            className={'ml-3 ' + medalColor}
          />}
        </td>

        <td>{stats.overall.gamesPlayed}</td>
        <td>{stats.overall.gamesWon}</td>
        <td>{stats.overall.winrate}</td>
      </tr>
      {opened &&
        Object.entries(stats.byBoardGames).map(
          ([boardgameName, boardgameStats], index) => (
            <tr
              key={boardgameName + stats.user.nickname}
              className={index % 2 === 0 ? 'bg-slate-200' : 'bg-amber-200'}
            >
              <td className='py-2'>{boardgameName}</td>
              <td>{boardgameStats.played}</td>
              <td>{boardgameStats.won}</td>
              <td>{boardgameStats.winrate}</td>
            </tr>
          )
        )}
    </>
  );
};

export default StatsTableRow;
