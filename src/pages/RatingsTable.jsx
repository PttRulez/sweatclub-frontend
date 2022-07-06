import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UsersStatsTable from '../components/stats/UsersStatsTable';
import { useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';

const RatingsTable = () => {
  const [usersStats, setUsersStats] = useState([]);
  const club = useSelector(state => state.general.club);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Таблица чемпионов';

    const params = club !== null ? { club_id: club.id } : {};
    setLoading(true);
    api.get('users-stats', { params }).then(res => {
      setLoading(false);
      setUsersStats(res.data);
    });
  }, [club]);

  return (
    <>
      {loading ? (
        <Loader addClasses={'w-52 h-52'} />
      ) : (
        <section className='pt-10 pb-1'>
          <UsersStatsTable usersStats={usersStats} className='w-full' />
        </section>
      )}
    </>
  );
};

export default RatingsTable;
