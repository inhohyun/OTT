import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ClothesItem = ({ item, isSelected, onClothingClick }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md relative cursor-pointer ${isSelected ? 'bg-gray-700' : ''}`}
      onClick={() => onClothingClick(item)}
    >
      <img
        src={item.img[0]}
        alt={item.category}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      {item.backImage && (
        <img
          src={item.img[1]}
          alt={item.category}
          className="w-full h-32 object-cover rounded-t-lg mt-2"
        />
      )}
      {isSelected && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="absolute text-white"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
          }}
        />
      )}
    </div>
  );
};

export default ClothesItem;
