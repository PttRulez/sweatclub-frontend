import { Link } from 'react-router-dom';

const Boardgame = ({ boardgame }) => {
  return (
    <Link
      to={`/boardgames/${boardgame.id}`}
      className='max-h-96 w-1/3 rounded-xl p-2 flex flex-col text-center justify-center'
    >
      <img
        src={boardgame.imageUrl}
        alt=''
        className='h-auto max-h-full w-auto max-w-full'
      />
    </Link>
  );
};

export default Boardgame;
