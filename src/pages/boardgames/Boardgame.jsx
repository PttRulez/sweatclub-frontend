import { BASE_URL_PATH } from '../../app/constants';

const Boardgame = ({ boardgame }) => {
  return (
    <div className='max-h-96 w-1/3 rounded-xl p-2 flex flex-col text-center justify-center'>
      <img
        src={`${BASE_URL_PATH}/${boardgame.image_path}`}
        alt=''
        className='h-auto max-h-full w-auto max-w-full'
      />
    </div>
  );
};

export default Boardgame;
