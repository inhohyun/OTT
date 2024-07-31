import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ClothesDetailModal = ({ isOpen, onClose, clothingItem }) => {
  if (!isOpen || !clothingItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="flex justify-center mb-4 mt-6">
          {' '}
          <img
            src={clothingItem.frontImage}
            alt="Front"
            className="w-40 h-50 object-cover rounded-lg"
          />
        </div>
        <div className="mb-4">
          <p>
            <strong>Brand:</strong> {clothingItem.brand}
          </p>
          <p>
            <strong>Size:</strong> {clothingItem.size}
          </p>
          <p>
            <strong>Color:</strong> {clothingItem.color}
          </p>
          <p>
            <strong>Purchase Location:</strong>{' '}
            <a
              href={clothingItem.purchase}
              target="_blank"
              rel="noopener noreferrer"
            >
              {clothingItem.purchase}
            </a>
          </p>
          <p>
            <strong>Public Status:</strong>{' '}
            {clothingItem.public_status === 'y' ? 'Public' : 'Private'}
          </p>
          <p>
            <strong>Gender:</strong>{' '}
            {clothingItem.gender === 'm' ? 'Male' : 'Female'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClothesDetailModal;
