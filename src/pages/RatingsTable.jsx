import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UsersStatsTable from '../components/stats/UsersStatsTable';

const RatingsTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('users-stats').then(res => {
      setUsers(res.data);
    })
  }, [])

  return (
    <section className='pl-52 pt-10 pb-1'>
      <UsersStatsTable users={users} className='w-full' />
    </section>
  );
};

export default RatingsTable;
