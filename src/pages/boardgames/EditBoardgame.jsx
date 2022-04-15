import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const CreateBoardGame = () => {
  const navigate = useNavigate();
  const { id: boardgameId } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hasPoints, setHasPoints] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    api.get(`/boardgames/${boardgameId}`).then(res => {
        setName(res.data.boardgame.name);
        setImageUrl(res.data.boardgame.image_url);
        setHasPoints(res.data.boardgame.has_points);
    });
  }, []);

  function createBoardgame(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('has_points', hasPoints);

    api.post(`/boardgames/${boardgameId}?_method=PUT`, formData).then(
      (res) => {
        navigate(`/boardgames/${boardgameId}`);
      },
      (err) => {
        if (err.response.status === 422) {
          setValidationErrors(err.response.data.errors);
        } else {
          alert('Edit error', err.status);
        }
      }
    );
  }

  return (
    <form className='mt-2 flex flex-col items-center text-center' onSubmit={createBoardgame}>
      <img src={imageUrl} alt="" className='w-56'/>
      {/* ------------------NAME---------------------------- */}
      <div>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Название игры
        </label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Название'
          onChange={(e) => setName(e.target.value)}
          
        />
        <p className='text-red-600'>{validationErrors.name}</p>
      </div>

      {/* ------------------HAS POINTS---------------------------- */}
      <div>
        <label
          htmlFor='has_points'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Игра на очки
        </label>
        <input
          type='checkbox'
          name='has_points'
          id='has_points'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={hasPoints}
          onChange={(e) => setHasPoints(!hasPoints)}
          checked={hasPoints}
        />
        <p className='text-red-600'>{validationErrors.name}</p>
      </div>
      
      {/* ------------------IMAGE---------------------------- */}
      <div className='mt-2'>
        <label
          htmlFor='image'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Картинка
        </label>
        <input
          type='file'
          name='image'
          id='image'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <p className='text-red-600'>{validationErrors.image}</p>
      <button
        type='submit'
        className='mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center disabled:opacity-40 disabled:cursor-not-allowed'
        disabled = {!name}
      >
        Правка
      </button>
    </form>
  );
};

export default CreateBoardGame;
