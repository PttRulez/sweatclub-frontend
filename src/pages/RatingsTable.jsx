import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UsersStatsTable from '../components/stats/UsersStatsTable';
import { useSelector } from 'react-redux';

const RatingsTable = () => {
  const [usersStats, setUsersStats] = useState([]);
  const club = useSelector(state => state.general.club)

  useEffect(() => {
    document.title = 'Таблица чемпионов';

    const params = club !== null ? { club_id : club.id } : {}

    api.get('users-stats', { params  }).then(res => {
      setUsersStats(res.data);
    })
  }, [club])

  return (
    <section className='pt-10 pb-1'>
      <UsersStatsTable usersStats={usersStats} className='w-full' />
    </section>
  );
};

export default RatingsTable;
