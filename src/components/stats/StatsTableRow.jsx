import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const StatsTableRow = ({ stats }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <tr className='bg-amber-200 leading-10'>
        <td className='relative align-middle'>
          <div className='absolute left-3'>
            <FontAwesomeIcon
              icon={opened ? faAngleDown : faAngleUp}
              onClick={() => setOpened(!opened)}
              className='cursor-pointer opacity-50'
            />
          </div>
          <span className='w-11/12'>{stats.user.nickname}</span>
        </td>
        <td>{stats.overall.gamesPlayed}</td>
        <td>{stats.overall.gamesWon}</td>
        <td>{stats.overall.winrate}</td>
      </tr>
      {opened &&
        Object.entries(stats.byBoardGames).map(
          ([boardgameName, boardgameStats]) => (
            <tr key={boardgameName + stats.user.nickname}>
              <td>{boardgameName}</td>
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
