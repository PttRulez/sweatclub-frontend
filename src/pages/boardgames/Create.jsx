import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const CreateBoardGame = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  function createBoardgame(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    api.post('/boardgames', formData).then(
      (res) => {

        swal('Игра успешно добавлена', res.data.name, 'success');
        navigate('/boardgames');
      },
      (err) => {
        setValidationErrors(err.response.data.errors);
      }
    );
  }

  return (
    <form className='mt-2 text-center' onSubmit={createBoardgame}>
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
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Название'
          onChange={(e) => setName(e.target.value)}
          
        />
        <p className='text-red-600'>{validationErrors.name}</p>
      </div>
      {/* ------------------EMAIL---------------------------- */}
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
        className='mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
      >
        Создать игру
      </button>
    </form>
  );
};

export default CreateBoardGame;
