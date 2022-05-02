import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UsersStatsTable from '../components/stats/UsersStatsTable';

const RatingsTable = () => {
  const [usersStats, setUsersStats] = useState([]);

  useEffect(() => {
    document.title = 'Таблица чемпионов';
    api.get('users-stats').then(res => {
      setUsersStats(res.data);
    })
  }, [])

  return (
    <section className='pl-52 pt-10 pb-1'>
      <UsersStatsTable usersStats={usersStats} className='w-full' />
    </section>
  );
};

export default RatingsTable;
