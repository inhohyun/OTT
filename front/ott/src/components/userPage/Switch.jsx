import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import lockIcon from '@/assets/icons/lockicon.png';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Switch = ({ isChecked, handleCheckboxChange }) => {
  return (
    <>
      <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div
          className={`shadow-card flex h-[46px] w-[82px] items-center justify-between rounded-full ${
            !isChecked ? 'bg-violet-500' : 'bg-stone-500'
          }`}
        >
          <span
            className={`flex h-full w-1/2 items-center justify-center rounded-full ${
              !isChecked ? 'bg-white text-violet-500' : 'text-white'
            }`}
          >
            <FontAwesomeIcon
              icon={faLock}
              className={`${!isChecked ? 'text-violet-500' : 'text-stone-500'}`}
            />
          </span>
          <span
            className={`flex h-full w-1/2 items-center justify-center rounded-full ${
              isChecked ? 'bg-white text-stone-500' : 'text-white'
            }`}
          ></span>
        </div>
      </label>
    </>
  );
};

export default Switch;
