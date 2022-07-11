import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const EditAnotherUser = ({ notYou }) => {
  const [user, setUser] = useState({
    id: '',
    nickname: '',
    avatarPicture: '',
    avatarUrl: '',
  });
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [errorList, setErrorList] = useState({});
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    api.get(`/users/${userId}`).then(res =>
      setUser(res.data.user)      
    );
  }, []);
    
  useEffect(() => {
      setNickname(user.nickname)
  }, [user.nickname]);

  

  const editProfile = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', user.nickname);
    formData.append('avatar', avatar);

    api.post(`/users/${user.id}?_method=PUT`, formData).then(res => {
      console.log(res);
      if (res.status === 200) {
        navigate(`/profile/${user.id}`);
      } else if (res.data.status === 422) {
        setErrorList(res.data.errors);
      } else {
        setErrorList({ message: res.data.message });
      }
    });
  };

  return (
    <section className='flex justify-center items-center content-center h-screen'>
      <form
        className='flex h-fit w-fit p-5 flex-col text-center bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10'
        onSubmit={editProfile}
      >
        {/* ------------------NICKNAME---------------------------- */}
        <div className='flex justify-evenly'>
          <img className='w-20 h-20 rounded-full mr-2' src={user.avatarUrl} alt='User Avatar' />
        </div>
        <div>
          <label htmlFor='nickname' className='block mt-5 mb-2'>
            Никнейм
          </label>
          <input
            type='text'
            name='nickname'
            id='nickname'
            autoComplete='off'
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  p-2.5 '
            value={user.nickname}
            onChange={e => setUser({...user, nickname: e.target.value})}
            required
          />
          <p className='text-red-600'>{errorList.nickname}</p>
        </div>

        {/* ------------------AVATAR---------------------------- */}
        <div className='mt-2'>
          <label htmlFor='avatar' className='block mt-5 mb-2'>
            Аватарка
          </label>
          <input
            type='file'
            name='avatar'
            id='avatar'
            className='bg-gray-50 border w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 '
            placeholder='img'
            onChange={e => setAvatar(e.target.files?.[0])}
          />
        </div>
        <p className='text-red-600'>{errorList.avatar}</p>

        <div className='mt-5'>
          <button
            type='submit'
            className='disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
            disabled={!user.nickname}
          >
            Правка
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditAnotherUser;
