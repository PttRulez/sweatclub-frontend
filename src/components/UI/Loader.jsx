import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = ({ addClasses }) => {
  return (
    <div className='text-center mt-12'>
      <FontAwesomeIcon
        icon={faSpinner}
        className={addClasses + ' text-zinc-900 animate-spin'}
      />
    </div>
  );
};

export default Loader;
