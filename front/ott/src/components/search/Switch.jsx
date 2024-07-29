import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTshirt } from '@fortawesome/free-solid-svg-icons';

const Switch = ({ isChecked, handleCheckboxChange }) => {
  return (
    <>
      <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div className='shadow-card flex h-[30px] w-[60px] items-center justify-between rounded-full bg-violet-500'>
          <span
            className={`flex h-full w-1/2 items-center justify-center rounded-full ${
              !isChecked ? 'bg-white text-violet-500' : 'text-white'
            }`}
          >
            <FontAwesomeIcon icon={faUser} className='text-violet-500' />
          </span>
          <span
            className={`flex h-full w-1/2 items-center justify-center rounded-full ${
              isChecked ? 'bg-white text-violet-500' : 'text-white'
            }`}
          >
            <FontAwesomeIcon icon={faTshirt} className='text-violet-500' />
          </span>
        </div>
      </label>
    </>
  );
};

export default Switch;
