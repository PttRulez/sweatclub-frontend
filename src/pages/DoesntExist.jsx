import { Link, useNavigate } from 'react-router-dom';

const DoesntExist = () => {
  const navigate = useNavigate();
  return (
    <section className='flex justify-center items-center content-center h-screen'>
      <div className='flex h-min w-56 p-5 flex-col text-center bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10'>
        <p>Такой страницы нет</p>
        <Link to='/' className='text-blue-500 mt-10'>
          {' '}
          Главная
        </Link>
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(-1)}>Назад</span>
      </div>
    </section>
  );
};

export default DoesntExist;
