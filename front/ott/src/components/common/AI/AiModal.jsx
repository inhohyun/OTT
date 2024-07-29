import React from 'react';
import defaultImage from '../../../assets/images/default_picture.png';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-11/12 max-w-xs mx-auto relative modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '350px' }}
      >
        <p
          onClick={onClose}
          className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-[1px] top-3"
        >
          &times;
        </p>
        <img
          src={defaultImage}
          alt="Default"
          className="w-full h-auto mb-4 mt-4"
        />
      </div>
    </div>
  );
};

export default Modal;
