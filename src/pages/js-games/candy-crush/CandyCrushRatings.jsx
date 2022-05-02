import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import api from '../../../api/api';
import { generateAvatar } from '../../../app/helpers';

const CandyCrushRatings = () => {
  const [usersStats, setUsersStats] = useState([]);

  const medalColors = {
    1: 'text-yellow-400',
    2: 'text-slate-600',
    3: 'text-amber-800',
  };

  useEffect(() => {
    api
      .get('candy-crush')
      .then((res) => {
        setUsersStats(res.data.data)
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <table className={`table-fixed text-center w-2/3 mt-10 mx-auto`}>
      <thead className='bg-slate-300 rounded-2xl'>
        <tr>
          <th colSpan='3'>Рейтинг Candy Crush</th>
        </tr>
      </thead>
      <tbody>
        {usersStats.map((stats, index) => (
          <tr className='leading-10 border-slate-400 border-b py-2'>
            <td>{index + 1}</td>
            <td className='align-middle flex justify-start items-center last:py-2 pl-4 py-2'>
              <img className='w-10 h-10 rounded-full mr-2' src={stats.user.avatarUrl || generateAvatar(stats.user.nickname)} alt='Avatar of Writer' />

              <span>{stats.user.nickname}</span>

              {index + 1 < 4 && <FontAwesomeIcon icon={faMedal} className={'ml-3 ' + medalColors[index + 1]} />}
            </td>

            <td>{stats.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandyCrushRatings;
