import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import UsersStatsTable from '../../components/stats/UsersStatsTable';

const Profile = () => {
  const { id: userId } = useParams();
  const [data, setData] = useState({ user: {}, byBoardGames: {}, overall: {} });

  useEffect(() => {
    document.title = 'Профиль';
    api.get(`users/${userId}`).then((res) => {
      setData(res.data);
      
    });
  }, [userId]);

  return (
    <>
      <section className='pt-10 pb-1 flex flex-col items-center'>
        <img src={data.user.avatarUrl} alt='' className='w-56' />
        <div className='flex items-center justify-center'>
          <h1>{data.user.nickname}</h1>
          <Link to={`/profile/edit`} className='text-xs ml-5'>
            <FontAwesomeIcon icon={faPencil} />
          </Link>
        </div>
      </section>
      <section>
        <UsersStatsTable usersStats={[data]} className='w-full' />
      </section>
    </>
  );
};

export default Profile;
